import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface UsePromptSubmissionProps {
    onSubmit?: (prompt: string) => void;
    value?: string;
    onChange?: (value: string) => void;
}

export function usePromptSubmission({
    onSubmit,
    value: controlledValue,
    onChange: controlledOnChange,
}: UsePromptSubmissionProps = {}) {
    const [internalValue, setInternalValue] = useState('');
    const navigate = useNavigate();

    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : internalValue;

    const handleChange = (newValue: string) => {
        if (isControlled && controlledOnChange) {
            controlledOnChange(newValue);
        } else {
            setInternalValue(newValue);
        }
    };

    const handleSubmit = () => {
        if (!value.trim()) return;

        if (onSubmit) {
            onSubmit(value);
            if (!isControlled) {
                setInternalValue(''); // Only clear if uncontrolled, otherwise parent handles it
            } else if (controlledOnChange) {
                controlledOnChange(''); // Request clear from parent
            }
        } else {
            // Default behavior: navigate to dashboard with prompt
            navigate('/dashboard', { state: { initialPrompt: value, forceNewChat: true } });
        }
    };

    return {
        value,
        handleChange,
        handleSubmit,
    };
}
