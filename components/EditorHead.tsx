const EditorHeader = (
    { feedElement }: 
    { feedElement: (syntax: string) => void }
) => {
    const btns = [
      { name: 'H1', syntax: '# ' },
      { name: 'H2', syntax: '## ' },
      { name: 'H3', syntax: '### ' },
      { name: 'B', syntax: '**Bold**' },
      { name: 'I', syntax: '*Italic*' },
      { name: 'S', syntax: '~Strikethrough~' },
      { name: '</>', syntax: '\n```\n\n``` ' },
  ]
  
    return (
      <header className="flex justify-center">
          {btns.map(btn => (
            <button
              key={btn.syntax}
              className=" justify-center flex rounded-md w-20"
              onClick={() => feedElement(btn.syntax)}
            >
              {btn.name}
            </button>
          ))}
      </header>
    )
  }
  
  export default EditorHeader