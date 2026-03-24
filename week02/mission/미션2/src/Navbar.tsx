import { THEME, useTheme } from "./context/ThemeProvider";
import ThemeToggleButton from './ThemeToggleButton'

export default function Navbar() {
    const { theme } = useTheme(); 

    const isLightMode = theme === THEME.LIGHT;

    return (<div>
        <ThemeToggleButton />
    </div>);
}