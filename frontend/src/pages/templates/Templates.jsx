import { TEMPLATES_DATA } from "../../data/templates"

const Templates = () => {
  return (
    <div>
      <h2>Choose a Template</h2>
      <div className="flex gap-4 mt-6 p-6">
        {TEMPLATES_DATA.map((template) => (
          <div key={template.id} className="grid grid-cols-2 bg-white border border-gray-200 rounded-2xl p-4 gap-2">
            <div className="flex flex-col bg-gray-200 p-4 gap-5 rounded-md">
              {/* first side of the resume */}
              <img src={template.profileImage} alt={`${template.name}'s profile`} className="w-16 h-16 rounded-full object-cover mb-2" />

              <div>
                {/* contact details */}
                <p className="text-sm">{template.contact.email}</p>
                <p className="text-sm">{template.contact.phone}</p>
                <p className="text-sm">{template.contact.location}</p>
                <p className="text-sm">{template.contact.website}</p>
                <p className="text-sm">{template.contact.linkedin}</p>
                <p className="text-sm">{template.contact.github}</p>
              </div>
              
              <div>
                {/* education details */}
                {template.education.map((edu) => {
                  return (
                    <div key={edu.id}>
                      <h2 className="text-bold text-2xl">Education</h2>
                      <p>{edu.degree}</p>
                      <p>{edu.institution}</p>
                      <p>{edu.location}</p>
                      <p>{edu.period}</p>
                      <p>{edu.details}</p>
                    </div>
                  )
                })}
              </div>

              <div>
                {/* expertise details */}
                {template.expertise.map((expert) => {
                  return (
                  <div>
                    <h2 className="text-bold text-2xl">Expertise</h2>
                    <div key={expert.category}>
                      <div>
                        <ul className="flex flex-col gap-2">
                          <h2>{expert.category}</h2>
                          <li>{expert.items}</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  )
                })}
              </div>

              <div>
                <h2 className="text-bold text-2xl">Languages</h2>
                <ul className="flex flex-col gap-2">{template.languages.map((language) => (
                  <li key={language.index}>{language}</li>
                ))}</ul>
              </div>
              
            </div>

            <div className="flex flex-col gap-4 p-4 rounded-md">
              {/* second side of the resume */}
              <div>
                <h3 className="text-lg font-bold">{template.name}</h3>
                <p className="text-sm">{template.designation}</p>
              </div>
              <div>
                <p>{template.summary}</p>
              </div>

              <div>
                {/* experience details */}
                {template.experience.map((exp) => {
                  return (
                    <div key={exp.id}>
                      <h2 className="text-bold text-2xl">Work Experience</h2>
                      <p>{exp.role}</p>
                      <p>{exp.company}</p>
                      <p>{exp.location}</p>
                      <p>{exp.period}</p>
                      <p>{exp.current}</p>
                      <p>{exp.description}</p>
                      <ul>{exp.achievements}</ul>
                    </div>
                  )
                })}
              </div>

            </div>
           
          </div>
        ))}
      </div>
    </div>
  )
}

export default Templates