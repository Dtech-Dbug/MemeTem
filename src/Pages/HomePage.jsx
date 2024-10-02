import React from 'react'
import { MemeTempData } from '../Data'
import { MagiCCard } from '../Components'

const HomePage = () => {
    return (
        <div className="App">
            <header className="App-header">APP HEADER</header>

            <div className="Meme-template-container">
                {MemeTempData.map((data, index) => (
                    <MagiCCard imageUrl={data} />
                ))}
            </div>
        </div>
    )
}

export default HomePage