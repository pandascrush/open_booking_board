---
name: form-handling
description: Form validation and handling patterns for the Bus Ticket Booking frontend. Covers validation on submit, inline error display, and email regex. Use when creating or modifying forms.
---

# Form Handling Skill

## Validation Strategy

Validate on submit only (not on every keystroke). Show errors inline below each field.

## Validation Rules

| Field | Rule | Error Message |
|-------|------|---------------|
| `firstName` | Required, min 1 char | "First name is required" |
| `lastName` | Required, min 1 char | "Last name is required" |
| `email` | Required, valid email | "Email is required" / "Please enter a valid email address" |

## Email Regex

```typescript
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
```

## Validation Pattern

```typescript
interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
}

const validate = (): boolean => {
  const newErrors: FormErrors = {};
  if (!firstName.trim()) newErrors.firstName = 'First name is required';
  if (!lastName.trim()) newErrors.lastName = 'Last name is required';
  if (!email.trim()) newErrors.email = 'Email is required';
  else if (!EMAIL_REGEX.test(email)) newErrors.email = 'Please enter a valid email address';
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};
```

## Error Display

```tsx
<input className={`${styles.input} ${errors.firstName ? styles.inputError : ''}`} />
{errors.firstName && <span className={styles.error}>{errors.firstName}</span>}
```

Style errors with `color: var(--color-error)`, `font-size: 12px`.

## Form Submission

```tsx
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  if (validate()) {
    onSubmit({ firstName: firstName.trim(), lastName: lastName.trim(), email: email.trim() });
  }
};
```
