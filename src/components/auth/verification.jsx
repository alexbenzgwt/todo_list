import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ONLY_DIGITS_REGEX = /\d/;

const Verification = () => {
    const navigate = useNavigate();

    const [otp, setOtp] = useState(['', '', '', '']);
    const [errorMessage, setErrorMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [secondsLeft, setSecondsLeft] = useState(30);

    const inputRefs = useRef(Array.from({ length: 4 }, () => null));

    const otpValue = useMemo(() => otp.join(''), [otp]);
    const isOtpComplete = useMemo(() => otp.every((d) => d.length === 1 && ONLY_DIGITS_REGEX.test(d)), [otp]);
    const isExpired = secondsLeft <= 0;

    useEffect(() => {
        // Auto-focus first input on mount
        inputRefs.current[0]?.focus();
    }, []);

    useEffect(() => {
        if (secondsLeft <= 0) return;
        const id = setInterval(() => {
            setSecondsLeft((s) => (s > 0 ? s - 1 : 0));
        }, 1000);
        return () => clearInterval(id);
    }, [secondsLeft]);

    const focusInput = (index) => {
        inputRefs.current[index]?.focus();
        inputRefs.current[index]?.select?.();
    };

    const handleChange = (index, value) => {
        if (value === '') {
            setOtp((prev) => {
                const next = [...prev];
                next[index] = '';
                return next;
            });
            return;
        }

        const char = value.slice(-1); // last character typed
        if (!ONLY_DIGITS_REGEX.test(char)) {
            return; // ignore non-digits
        }

        setOtp((prev) => {
            const next = [...prev];
            next[index] = char;
            return next;
        });

        if (index < inputRefs.current.length - 1) {
            focusInput(index + 1);
        }
    };

    const handleKeyDown = (index, e) => {
        const key = e.key;

        if (key === 'Backspace') {
            if (otp[index]) {
                // Clear current cell
                setOtp((prev) => {
                    const next = [...prev];
                    next[index] = '';
                    return next;
                });
            } else if (index > 0) {
                focusInput(index - 1);
                setOtp((prev) => {
                    const next = [...prev];
                    next[index - 1] = '';
                    return next;
                });
            }
            return;
        }

        if (key === 'ArrowLeft' && index > 0) {
            e.preventDefault();
            focusInput(index - 1);
            return;
        }

        if (key === 'ArrowRight' && index < inputRefs.current.length - 1) {
            e.preventDefault();
            focusInput(index + 1);
            return;
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pasted = e.clipboardData.getData('text').replace(/\D/g, '');
        if (!pasted) return;

        const next = ['','', '', ''];
        for (let i = 0; i < Math.min(4, pasted.length); i += 1) {
            next[i] = pasted[i];
        }
        setOtp(next);
        if (pasted.length >= 4) {
            inputRefs.current[3]?.blur();
        } else {
            focusInput(pasted.length);
        }
    };

    const validateOtp = () => {
        if (!isOtpComplete) {
            return 'Please enter the 4-digit code.';
        }
        if (!/^\d{4}$/.test(otpValue)) {
            return 'OTP must contain only digits.';
        }
        return '';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;

        if (isExpired) {
            setErrorMessage('The verification code has expired. Please resend the code.');
            return;
        }

        const validationError = validateOtp();
        if (validationError) {
            setErrorMessage(validationError);
            return;
        }

        setErrorMessage('');
        setIsSubmitting(true);

        // Simulate verification call
        setTimeout(() => {
            // Example: treat 1234 as success
            if (otpValue === '1234') {
                navigate('/login');
            } else {
                setErrorMessage('Invalid verification code.');
            }
            setIsSubmitting(false);
        }, 800);
    };

    const handleResend = () => {
        // Simulate resend: reset timer and clear inputs
        setOtp(['', '', '', '']);
        setErrorMessage('');
        setSecondsLeft(30);
        inputRefs.current[0]?.focus();
    };

    return (
        <div className="min-h-screen bg-white flex flex-col justify-center py-12 sm:px-6 lg:px-8 -mt-9">
            <div className="sm:mx-auto sm:w-full sm:max-w-max">
                <div className="flex justify-center">
                    <div className=" p-3 rounded-lg"> 
                        <img src="./src/assets/TruedoitLogo.png" alt="" style={{width:"300px", height:"90px"}}/>
                        <p className='text-gray-600'>Your freelance journey, made effortless</p>
                    </div>
                </div>
                <div className='size-full mb-1 border-3 max-w-md border-[#F5C4BF] rounded-2xl bg-white shadow sm:rounded-3xl px-4 py-4'>
                    <p className=" text-center text-2xl font-semibold text-[#444444] flex justify-items-start">
                        Verification
                    </p>
                    <p className="mt-1  text-start text-medium text-[#444444] flex justify-items-start font-medium">
                        Enter your 4 digits code that you received on your email
                    </p>

                    <form className="mt-10 sm:mx-auto sm:w-full sm:max-w-md" onSubmit={handleSubmit}>
                        <div className='px-4 ml-12 flex items-center gap-5' onPaste={handlePaste}>
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={(el) => (inputRefs.current[index] = el)}
                                    type="text"
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    maxLength="1"
                                    value={digit}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    className={`w-12 h-12 text-center border border-[#D6D6D6] rounded-lg ${index !== 0 ? 'ml-2' : ''} ${isExpired ? 'opacity-60' : ''}`}
                                    disabled={isExpired}
                                    aria-label={`Digit ${index + 1}`}
                                />
                            ))}
                        </div>

                        <div className="mt-3 flex items-center justify-center" aria-live="polite">
                            {!isExpired ? (
                                <p className="text-sm text-[#F2451C] ">00:{String(secondsLeft).padStart(2, '0')}</p>
                            ) : (
                                <button type="button" onClick={handleResend} className="text-sm text-red-600 underline disabled:opacity-50" disabled={!isExpired}>
                                Resend code
                            </button>
                            )}
                            
                        </div>

                        {errorMessage && (
                            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm mt-4">
                                {errorMessage}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={!isOtpComplete || isSubmitting || isExpired}
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-2xl font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer mt-5 items-center"
                        >
                            {isSubmitting ? 'Verifying...' : 'Verify'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Verification