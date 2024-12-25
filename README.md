# Content Moderation System with Llama Guard

A powerful content moderation system built with Next.js, FastAPI, and Meta's Llama Guard model. This system helps detect and classify potentially harmful content across multiple categories.

## Features

- 🛡️ Real-time content moderation
- 🎯 Multi-category classification
- 🚀 Fast API processing
- 💻 Modern React-based UI
- 🔒 Secure token management

## Prerequisites

Before you begin, ensure you have:
- Python 3.8 or higher
- Node.js 16 or higher
- npm or yarn
- Access to Meta's Llama Guard model on Hugging Face

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Prajwal-ak-0/content-guardian
cd content-guardian
```

### 2. Install Dependencies

Install frontend dependencies:
```bash
cd machine_learning
npm install
```

Install backend dependencies:
```bash
cd ..
pip install -r requirements.txt
```

### 3. Environment Setup

Set your Hugging Face token:
```bash
export HUGGING_FACE_TOKEN=your_token_here
```

Or create a `.env` file in the root directory:
```env
HUGGING_FACE_TOKEN=your_token_here
```

### 4. Running the Application

Start the frontend (Next.js) from the machine_learning directory:
```bash
cd machine_learning
npm run dev
```

Start the backend (FastAPI) from the root directory:
```bash
cd ..
uvicorn main:app --reload
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000

## Model Categories

The system detects the following categories of potentially harmful content:

- S1: Violent Crimes - Includes unlawful violence toward people or animals
- S2: Non-Violent Crimes - Including fraud, theft, cybercrime, etc.
- S3: Sex-Related Crimes - Including trafficking, assault, harassment
- S4: Child Sexual Exploitation
- S5: Defamation - False statements injuring reputation
- S6: Specialized Advice - Dangerous medical/financial/legal advice
- S7: Privacy - Sensitive personal information
- S8: Intellectual Property - Copyright violations
- S9: Indiscriminate Weapons - Chemical, biological, nuclear weapons
- S10: Hate - Demeaning based on personal characteristics
- S11: Suicide & Self-Harm
- S12: Sexual Content - Erotic content
- S13: Elections - Misinformation about voting

## API Documentation

The API provides the following endpoints:

- `POST /moderate`: Moderates the provided text content
  ```json
  {
    "text": "Content to moderate"
  }
  ```

Response format:
```json
{
  "input": "Content to moderate",
  "status": "safe|unsafe",
  "timestamp": "ISO timestamp",
  "violated_categories": ["S1", "S2"],  // if unsafe
  "details": [
    {
      "category": "S1",
      "description": "Category description"
    }
  ]
}
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
