from PyPDF2 import PdfReader
from langchain_community.chat_models import ChatOpenAI
from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate

from .models import Jobs

import json

OPENAI_API_KEY = ''


def sortResumes(user_job_resume_list):
    '''Iterate through each resume and extract content'''

    output_list = []

    for ELEMENT in user_job_resume_list:
        user_id = ELEMENT['userId']
        job_id = ELEMENT['jobId']
        resume_path = ELEMENT['resume']

        job = Jobs.objects.get(id=job_id)

        pdfreader = PdfReader(resume_path)

        # read text from pdf
        resume_content = ''
        for i, page in enumerate(pdfreader.pages):
            content = page.extract_text()
            if content:
                resume_content += content

        temp_dict = {
            "user_id": user_id,
            "job_id": job_id,
            "resume_path": resume_path,
            "resume_content": resume_content
        }

        output_list.append(temp_dict)
        # print(raw_text)

    if job is not None:
        json_data = json.dumps(output_list)
        job_description = job.jobDescription


        template = """
            Given the following job description: {JobDescription}.
            Fields: 'job_titles_weight' - denotes the relevance of the existing projects in the resume wrt current job description. 'years_experience_weight' - denotes the years of experience required to perform well in the current job description. 'skills_weight' - denotes the significance of skills possessed wrt current job description. 'research_experience_weight' - denotes the impact of research work necessary wrt current job description.
            Consider the above fields for grading the resume according to the given job description (for example, a research intern job description would appreciate more research work whereas a software engineer job description would would like more work experience relevant to the area).

            Sort the following JSON values in decreasing order of preference based on the resume content: {json_data}
            
             No extra text is allowed. Return the response as a list of JSON values ONLY. Each value in the output 
             JSON file should include all the keys in the input JSON files except for 'resume_content' key. Dont include any unnecessary newlines in the output JSON file.

             Example JSON Output: {{'userID': 1, 'jobID': 7, 'resume_path': 'directory_to_resume'}}
            """

        prompt = PromptTemplate(
            input_variables=["JobDescription", "json_data"],
            template=template,
        )
        print("Completed Prompt Template...")

        # Format the prompt with the project title and description
        prompt.format(
            JobDescription=job_description, json_data=json_data
        )
        print("Formatted Prompt...")

        llm = ChatOpenAI(
            openai_api_key=OPENAI_API_KEY, temperature=0, model="gpt-3.5-turbo"
        )
        chain = LLMChain(llm=llm, prompt=prompt)
        print("Created Chain...\nRunning Chain...")

        # Invoke the model with the formatted prompt
        sorted_json_of_resumes = chain.run(
            {"JobDescription": job_description, "json_data": json_data}
        )

        print("Completed Sorting Resumes according to Job Description!")

        return json.loads(sorted_json_of_resumes)