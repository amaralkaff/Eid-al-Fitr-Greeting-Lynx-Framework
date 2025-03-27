import '../styles/Components.css';

interface CustomButtonProps {
  text: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  icon?: string;
  fullWidth?: boolean;
}

export function CustomButton({
  text,
  onClick,
  variant = 'primary',
  icon,
  fullWidth = false,
}: CustomButtonProps) {
  return (
    <view 
      className={`custom-button button-${variant} ${fullWidth ? 'full-width' : ''}`}
      bindtap={onClick}
    >
      {icon && <text className="button-icon">{icon}</text>}
      <text className="button-text">{text}</text>
    </view>
  );
} 