import { useState } from 'react'
import { TbArrowBigRightLines } from "react-icons/tb";
import { MdOutlineContentCopy } from 'react-icons/md'
import { BsTrash3 } from 'react-icons/bs'
import { Toaster, toast } from 'sonner'
import ProcesedCss from './JSFunctions/ProcesedCss'
import backgroundImage from '/youtube.gif';

function App() {
  const [forData, setforData] = useState<{ [key: string]: string }>({})

  const capture = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setforData({
      ...forData,
      [e.target.name]: e.target.value
    })
  }

  const transformData = (e: string) => {
    setforData({
      ...forData,
      ['finalText']: ProcesedCss(forData[e])
    })
  }

  const handleCopy = () => {
    if (forData['finalText'] != '') {
      navigator.clipboard
        .writeText(forData['finalText'])
        .then(() => {
          toast.success('Copiado con exito')
        })
        .catch(() => {
          toast.error('Copiado con exito')
        })
    } else {
      toast.error('El campo esta vacio')
    }
  }

  const handleDelete = (e: string) => {
    setforData({
      ...forData,
      [e]: ''
    })
  }

  return (
    <>
      <Toaster richColors position="top-center" />
      <div style={{backgroundImage:`url(${backgroundImage})`}} className="App-container">
        <h1 className="title">Generador de clases de Tailwind</h1>
        <div className="App">
          <div className="container-1">
            <textarea
              className="text-area-left"
              placeholder="Ingrese tu texto"
              value={forData['initialText']}
              onChange={capture}
              name="initialText"
            />
            <BsTrash3
              onClick={() => {
                handleDelete('initialText')
              }}
              className="trash-left"
            />
          </div>
          <TbArrowBigRightLines 
            className="arrow"
            onClick={() => {
              transformData('initialText')
            }}
          />
          <i className="fa-solid fa-arrow-right"></i>
          <div className="container-3">
            <textarea
              className="text-area-right"
              placeholder="Texto Final"
              value={forData['finalText']}
              name="finalText"
              onChange={capture}
            />
            <BsTrash3
              onClick={() => {
                handleDelete('finalText')
              }}
              className="trash-right"
            />
            <MdOutlineContentCopy onClick={handleCopy} className="copy-paste" />
          </div>
        </div>
      </div>
    </>
  )
}

export default App
