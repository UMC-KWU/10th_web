import { TDThemeProvider } from "./context/ThemeProvider";
import ThemeContent from "./ThemeContent";
import Navbar from "./Navbar";


export default function ContextPage(){
    return (
        <TDThemeProvider>
            <div className='flex flex items-center justify-center min-h-screen'>
                <Navbar />
                <main className="flex-1">
                    <ThemeContent />
                </main>
            </div>
        </TDThemeProvider>
    )
}