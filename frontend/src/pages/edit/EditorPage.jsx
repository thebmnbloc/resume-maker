
const EditorPage = () => {
  return (
    <div className="grid grid-cols-2 gap-2">
      <div className="flex flex-col gap-4">
        <h2 className="text-center text-2xl">Create Resume</h2>
        <div className="flex flex-col gap-4">
          <h2>Personal Information</h2>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col gap-4">
              <label>Full Name</label>
              <input type="text" />
            </div>
            <div className="flex flex-col gap-4">
              <label>Contact</label>
              <input type="contact" />
            </div>
          </div>
        </div>
      </div>

      <div className="border border-amber-200 min-h-screen">
        <h2 className="text-center text-2xl">Preview</h2>
        <div>
          <textarea />
        </div>
      </div>
    </div>
  )
}

export default EditorPage