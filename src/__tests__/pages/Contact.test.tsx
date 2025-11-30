import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import Contact from '@/pages/Contact';

// Mock the toast hook
const mockToast = vi.fn();
vi.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: mockToast,
  }),
}));

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

describe('Contact Form', () => {
  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const renderContact = () => {
    return render(
      <BrowserRouter>
        <Contact />
      </BrowserRouter>
    );
  };

  it('renders contact form with all fields', () => {
    renderContact();

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/subject/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
  });

  it('renders contact information section', () => {
    renderContact();

    expect(screen.getByText(/let's connect/i)).toBeInTheDocument();
    expect(screen.getByText(/sahilsaykar24@gmail.com/i)).toBeInTheDocument();
    expect(screen.getByText(/\+91 9175245702/i)).toBeInTheDocument();
    expect(screen.getByText(/Mumbai,\s*India/i)).toBeInTheDocument();
  });

  it('updates form fields on input', async () => {
    const user = userEvent.setup();
    renderContact();

    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const subjectInput = screen.getByLabelText(/subject/i);
    const messageInput = screen.getByLabelText(/message/i);

    await user.type(nameInput, 'John Doe');
    await user.type(emailInput, 'john@example.com');
    await user.type(subjectInput, 'Test Subject');
    await user.type(messageInput, 'Test message');

    expect(nameInput).toHaveValue('John Doe');
    expect(emailInput).toHaveValue('john@example.com');
    expect(subjectInput).toHaveValue('Test Subject');
    expect(messageInput).toHaveValue('Test message');
  });

  it('validates required fields', async () => {
    const user = userEvent.setup();
    renderContact();

    const submitButton = screen.getByRole('button', { name: /send message/i });
    
    // Try to submit without filling fields
    await user.click(submitButton);

    // Check that all required fields are present (HTML5 validation)
    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const subjectInput = screen.getByLabelText(/subject/i);
    const messageInput = screen.getByLabelText(/message/i);

    expect(nameInput).toBeRequired();
    expect(emailInput).toBeRequired();
    expect(subjectInput).toBeRequired();
    expect(messageInput).toBeRequired();
  });

  it('validates email format', () => {
    renderContact();

    const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement;
    expect(emailInput.type).toBe('email'); // HTML5 email validation
  });

  it('submits form successfully with valid data', async () => {
    const user = userEvent.setup();
    
    // Mock successful API response
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true, message: 'Email sent successfully!' }),
    });

    renderContact();

    // Fill form
    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const subjectInput = screen.getByLabelText(/subject/i);
    const messageInput = screen.getByLabelText(/message/i);

    await user.type(nameInput, 'John Doe');
    await user.type(emailInput, 'john@example.com');
    await user.type(subjectInput, 'Test Subject');
    await user.type(messageInput, 'Test message');

    // Submit form
    const submitButton = screen.getByRole('button', { name: /send message/i });
    await user.click(submitButton);

    // Wait for API call
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/contact'),
        expect.objectContaining({
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: 'John Doe',
            email: 'john@example.com',
            subject: 'Test Subject',
            message: 'Test message',
          }),
        })
      );
    });

    // Check success toast was called
    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Message Sent!',
          description: expect.stringContaining('Thank you for reaching out'),
        })
      );
    });

    // Check form was reset
    await waitFor(() => {
      expect(nameInput).toHaveValue('');
      expect(emailInput).toHaveValue('');
      expect(subjectInput).toHaveValue('');
      expect(messageInput).toHaveValue('');
    });
  });

  it('shows error message on API failure', async () => {
    const user = userEvent.setup();
    
    // Mock failed API response
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: false,
      json: async () => ({ success: false, error: 'Failed to send email' }),
    });

    renderContact();

    // Fill and submit form
    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const subjectInput = screen.getByLabelText(/subject/i);
    const messageInput = screen.getByLabelText(/message/i);

    await user.type(nameInput, 'John Doe');
    await user.type(emailInput, 'john@example.com');
    await user.type(subjectInput, 'Test Subject');
    await user.type(messageInput, 'Test message');

    const submitButton = screen.getByRole('button', { name: /send message/i });
    await user.click(submitButton);

    // Wait for error toast
    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Error',
          variant: 'destructive',
        })
      );
    });
  });

  it('handles network errors gracefully', async () => {
    const user = userEvent.setup();
    
    // Mock network error
    global.fetch = vi.fn().mockRejectedValueOnce(new Error('Network error'));

    renderContact();

    // Fill and submit form
    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const subjectInput = screen.getByLabelText(/subject/i);
    const messageInput = screen.getByLabelText(/message/i);

    await user.type(nameInput, 'John Doe');
    await user.type(emailInput, 'john@example.com');
    await user.type(subjectInput, 'Test Subject');
    await user.type(messageInput, 'Test message');

    const submitButton = screen.getByRole('button', { name: /send message/i });
    await user.click(submitButton);

    // Wait for error toast
    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Error',
          variant: 'destructive',
        })
      );
    });
  });

  it('disables submit button while submitting', async () => {
    const user = userEvent.setup();
    
    // Mock slow API response
    global.fetch = vi.fn().mockImplementation(
      () =>
        new Promise((resolve) =>
          setTimeout(
            () =>
              resolve({
                ok: true,
                json: async () => ({ success: true, message: 'Email sent successfully!' }),
              }),
            100
          )
        )
    );

    renderContact();

    // Fill form
    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const subjectInput = screen.getByLabelText(/subject/i);
    const messageInput = screen.getByLabelText(/message/i);

    await user.type(nameInput, 'John Doe');
    await user.type(emailInput, 'john@example.com');
    await user.type(subjectInput, 'Test Subject');
    await user.type(messageInput, 'Test message');

    const submitButton = screen.getByRole('button', { name: /send message/i });
    
    // Submit form
    await user.click(submitButton);

    // Button should be disabled and show "Sending..."
    expect(submitButton).toBeDisabled();
    expect(screen.getByText(/sending.../i)).toBeInTheDocument();

    // Wait for submission to complete
    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });
  });

  it('calls API with correct endpoint', async () => {
    const user = userEvent.setup();
    
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true, message: 'Email sent successfully!' }),
    });

    renderContact();

    // Fill and submit form
    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const subjectInput = screen.getByLabelText(/subject/i);
    const messageInput = screen.getByLabelText(/message/i);

    await user.type(nameInput, 'John Doe');
    await user.type(emailInput, 'john@example.com');
    await user.type(subjectInput, 'Test Subject');
    await user.type(messageInput, 'Test message');

    const submitButton = screen.getByRole('button', { name: /send message/i });
    await user.click(submitButton);

    // Verify API was called with correct endpoint
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/contact'),
        expect.objectContaining({
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        })
      );
    });
  });
});

