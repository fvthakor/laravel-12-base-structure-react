import { Button } from '@/components/ui/button';
import { Sun, Moon, Monitor } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAppearance, type Appearance } from '@/hooks/use-appearance';

interface ThemeSwitcherProps {
    size?: 'sm' | 'md' | 'lg';
}

export const ThemeSwitcher = ({ size = 'sm' }: ThemeSwitcherProps) => {
    const { appearance, updateAppearance } = useAppearance();

    const handleThemeChange = (mode: Appearance) => {
        updateAppearance(mode);
    };

    const iconClass = size === 'sm' ? 'w-4 h-4' : size === 'md' ? 'w-5 h-5' : 'w-6 h-6';
    const textClass = size === 'sm' ? 'text-sm' : size === 'md' ? 'text-base' : 'text-lg';

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size={size}>
                    {appearance === 'light' && <Sun className={iconClass} />}
                    {appearance === 'dark' && <Moon className={iconClass} />}
                    {appearance === 'system' && <Monitor className={iconClass} />}
                    <span className={`ml-2 capitalize ${textClass}`}>{appearance}</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem
                    onClick={() => handleThemeChange('light')}
                    className={appearance === 'light' ? 'bg-accent' : ''}
                >
                    <Sun className="w-4 h-4 mr-2" />
                    Light
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => handleThemeChange('dark')}
                    className={appearance === 'dark' ? 'bg-accent' : ''}
                >
                    <Moon className="w-4 h-4 mr-2" />
                    Dark
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => handleThemeChange('system')}
                    className={appearance === 'system' ? 'bg-accent' : ''}
                >
                    <Monitor className="w-4 h-4 mr-2" />
                    System
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
