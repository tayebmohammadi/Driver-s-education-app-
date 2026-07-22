import { ContentBlockType, QuestionType } from "@prisma/client";
import type { UnitSeed } from "../types";

export const unit01: UnitSeed = {
  title: "The California Driver's License",
  description:
    "Learn what a California driver's license allows you to do, license classes, and card designations.",
  orderNumber: 1,
  chapters: [
    {
      title: "License Basics and Requirements",
      description: "Understanding California driver's licenses and license classes.",
      orderNumber: 1,
      lessons: [
        {
          title: "What Is a California Driver's License?",
          description:
            "Overview of the California driver's license and testing requirements.",
          estimatedDuration: 8,
          orderNumber: 1,
          blocks: [
            {
              type: ContentBlockType.HEADING,
              orderNumber: 1,
              content: { text: "The California Driver's License", level: 1 },
            },
            {
              type: ContentBlockType.PARAGRAPH,
              orderNumber: 2,
              content: {
                text: "A California driver's license allows you to drive on public roads. Before you can get a driver's license in California, you are required to pass the knowledge and behind-the-wheel drive tests based on information in the handbook.",
              },
            },
            {
              type: ContentBlockType.CALLOUT,
              orderNumber: 3,
              content: {
                title: "DMV Rule",
                text: "You must have the correct license to drive your vehicle type. Most people need a noncommercial Class C driver's license.",
                variant: "info",
              },
            },
            {
              type: ContentBlockType.PARAGRAPH,
              orderNumber: 4,
              content: {
                text: "To operate commercial vehicles, motorcycles, and other types of vehicles, you must have a different class of license. For information on vehicles covered by a Class C license, visit dmv.ca.gov/dl.",
              },
            },
            {
              type: ContentBlockType.HEADING,
              orderNumber: 5,
              content: { text: "Lesson Summary", level: 2 },
            },
            {
              type: ContentBlockType.CHECKLIST,
              orderNumber: 6,
              content: {
                title: "Key Takeaways",
                items: [
                  "A California license is required to drive on public roads.",
                  "You must pass knowledge and behind-the-wheel tests.",
                  "Most drivers need a noncommercial Class C license.",
                  "Other vehicle types require different license classes.",
                ],
              },
            },
          ],
          questions: [
            {
              question:
                "What must you pass before getting a California driver's license?",
              explanation:
                "The handbook states you must pass the knowledge and behind-the-wheel drive tests.",
              category: "licensing",
              questionType: QuestionType.MULTIPLE_CHOICE,
              orderNumber: 1,
              answers: [
                {
                  answerText:
                    "Knowledge and behind-the-wheel drive tests",
                  isCorrect: true,
                  orderNumber: 1,
                },
                {
                  answerText: "Only a vision test",
                  isCorrect: false,
                  orderNumber: 2,
                },
                {
                  answerText: "Only a written test",
                  isCorrect: false,
                  orderNumber: 3,
                },
                {
                  answerText: "A vehicle inspection only",
                  isCorrect: false,
                  orderNumber: 4,
                },
              ],
            },
            {
              question:
                "Which license class do most California drivers need?",
              explanation:
                "The handbook states most people need a noncommercial Class C driver's license.",
              category: "licensing",
              questionType: QuestionType.MULTIPLE_CHOICE,
              orderNumber: 2,
              answers: [
                {
                  answerText: "Noncommercial Class C",
                  isCorrect: true,
                  orderNumber: 1,
                },
                {
                  answerText: "Commercial Class A",
                  isCorrect: false,
                  orderNumber: 2,
                },
                {
                  answerText: "Motorcycle Class M only",
                  isCorrect: false,
                  orderNumber: 3,
                },
                {
                  answerText: "Class B restricted",
                  isCorrect: false,
                  orderNumber: 4,
                },
              ],
            },
            {
              question:
                "A California driver's license allows you to drive on public roads.",
              explanation:
                "The handbook opens Section 1 by stating a California driver's license allows you to drive on public roads.",
              category: "licensing",
              questionType: QuestionType.TRUE_FALSE,
              orderNumber: 3,
              answers: [
                { answerText: "True", isCorrect: true, orderNumber: 1 },
                { answerText: "False", isCorrect: false, orderNumber: 2 },
              ],
            },
          ],
        },
        {
          title: "Card Designations and ID Cards",
          description:
            "REAL ID, organ donation, veteran designations, and California ID cards.",
          estimatedDuration: 10,
          orderNumber: 2,
          blocks: [
            {
              type: ContentBlockType.HEADING,
              orderNumber: 1,
              content: { text: "Card Designations", level: 1 },
            },
            {
              type: ContentBlockType.HEADING,
              orderNumber: 2,
              content: { text: "REAL ID Driver's License", level: 2 },
            },
            {
              type: ContentBlockType.PARAGRAPH,
              orderNumber: 3,
              content: {
                text: "Beginning May 2025, your driver's license or identification (ID) card must be REAL ID compliant if you use it to board an airplane for domestic flights, enter military bases, or enter most federal facilities.",
              },
            },
            {
              type: ContentBlockType.CALLOUT,
              orderNumber: 4,
              content: {
                title: "Safety Note",
                text: "Visit dmv.ca.gov/realid to learn more about applying for a REAL ID.",
                variant: "tip",
              },
            },
            {
              type: ContentBlockType.PARAGRAPH,
              orderNumber: 5,
              content: {
                text: "California offers driver's licenses for all residents regardless of immigration status. ID cards are issued for identification purposes to eligible persons of any age. They do not permit you to drive.",
              },
            },
            {
              type: ContentBlockType.CHECKLIST,
              orderNumber: 6,
              content: {
                title: "To Get an ID Card You Must Provide",
                items: [
                  "Your identity document",
                  "Residency documents",
                  "Your social security number",
                ],
              },
            },
            {
              type: ContentBlockType.QUOTE,
              orderNumber: 7,
              content: {
                text: "ID cards do not permit you to drive.",
                attribution: "California Driver's Handbook, Section 1",
              },
            },
          ],
          questions: [
            {
              question:
                "Beginning May 2025, a REAL ID is required to board domestic flights.",
              explanation:
                "The handbook states REAL ID compliance is required for domestic flights, military bases, and most federal facilities beginning May 2025.",
              category: "licensing",
              questionType: QuestionType.TRUE_FALSE,
              orderNumber: 1,
              answers: [
                { answerText: "True", isCorrect: true, orderNumber: 1 },
                { answerText: "False", isCorrect: false, orderNumber: 2 },
              ],
            },
            {
              question: "What is true about California ID cards?",
              explanation:
                "The handbook states ID cards are issued for identification and do not permit you to drive.",
              category: "licensing",
              questionType: QuestionType.MULTIPLE_CHOICE,
              orderNumber: 2,
              answers: [
                {
                  answerText: "They do not permit you to drive",
                  isCorrect: true,
                  orderNumber: 1,
                },
                {
                  answerText: "They replace a driver's license on all roads",
                  isCorrect: false,
                  orderNumber: 2,
                },
                {
                  answerText: "They are only for seniors",
                  isCorrect: false,
                  orderNumber: 3,
                },
                {
                  answerText: "They allow motorcycle operation",
                  isCorrect: false,
                  orderNumber: 4,
                },
              ],
            },
            {
              question:
                "California offers driver's licenses for all residents regardless of immigration status.",
              explanation:
                "Section 1 explicitly states California offers driver's licenses for all residents regardless of immigration status.",
              category: "licensing",
              questionType: QuestionType.TRUE_FALSE,
              orderNumber: 3,
              answers: [
                { answerText: "True", isCorrect: true, orderNumber: 1 },
                { answerText: "False", isCorrect: false, orderNumber: 2 },
              ],
            },
            {
              question:
                "Which documents are required to get a California ID card?",
              explanation:
                "The handbook lists identity document, residency documents, and social security number.",
              category: "licensing",
              questionType: QuestionType.MULTIPLE_CHOICE,
              orderNumber: 4,
              answers: [
                {
                  answerText:
                    "Identity document, residency documents, and social security number",
                  isCorrect: true,
                  orderNumber: 1,
                },
                {
                  answerText: "Only a birth certificate",
                  isCorrect: false,
                  orderNumber: 2,
                },
                {
                  answerText: "Vehicle registration only",
                  isCorrect: false,
                  orderNumber: 3,
                },
                {
                  answerText: "Proof of insurance only",
                  isCorrect: false,
                  orderNumber: 4,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export const unit02: UnitSeed = {
  title: "Getting an Instruction Permit and Driver's License",
  description:
    "Application requirements, instruction permits, provisional licenses, and minor restrictions.",
  orderNumber: 2,
  chapters: [
    {
      title: "Applying for Your Permit and License",
      description: "Documents, steps, and requirements to obtain a license.",
      orderNumber: 1,
      lessons: [
        {
          title: "What You Need to Apply",
          description:
            "Required documents and steps for an instruction permit or driver's license.",
          estimatedDuration: 12,
          orderNumber: 1,
          blocks: [
            {
              type: ContentBlockType.HEADING,
              orderNumber: 1,
              content: { text: "Getting Started", level: 1 },
            },
            {
              type: ContentBlockType.PARAGRAPH,
              orderNumber: 2,
              content: {
                text: "If you do not have a driver's license from California or another state, you must apply for an instruction permit before taking the behind-the-wheel drive test to get your driver's license.",
              },
            },
            {
              type: ContentBlockType.CHECKLIST,
              orderNumber: 3,
              content: {
                title: "Required Documents",
                items: [
                  "Proof of identity",
                  "Two proofs of residency (exceptions may apply)",
                  "Legal full name document if name differs from identity document",
                  "Social security number (exceptions may apply)",
                ],
              },
            },
            {
              type: ContentBlockType.HEADING,
              orderNumber: 4,
              content: { text: "Instruction Permit Steps", level: 2 },
            },
            {
              type: ContentBlockType.CHECKLIST,
              orderNumber: 5,
              content: {
                title: "Steps to Apply for a Class C Instruction Permit",
                items: [
                  "Complete a Driver's License & ID Card Application",
                  "Provide your documents",
                  "Pay a non-refundable application fee",
                  "Pass your knowledge test(s)",
                  "Pass a vision test",
                ],
              },
            },
            {
              type: ContentBlockType.CALLOUT,
              orderNumber: 6,
              content: {
                title: "Under 18 Requirements",
                text: "If you are under 18, you must be at least 15½ years old, complete driver education, have a parent or guardian sign to approve the application and accept financial responsibility, and wait to use your permit until behind-the-wheel training begins.",
                variant: "warning",
              },
            },
          ],
          questions: [
            {
              question:
                "If you do not have a California or out-of-state license, what must you apply for first?",
              explanation:
                "The handbook requires an instruction permit before the behind-the-wheel drive test.",
              category: "licensing",
              questionType: QuestionType.MULTIPLE_CHOICE,
              orderNumber: 1,
              answers: [
                {
                  answerText: "An instruction permit",
                  isCorrect: true,
                  orderNumber: 1,
                },
                {
                  answerText: "A commercial license",
                  isCorrect: false,
                  orderNumber: 2,
                },
                {
                  answerText: "Vehicle registration",
                  isCorrect: false,
                  orderNumber: 3,
                },
                {
                  answerText: "A REAL ID only",
                  isCorrect: false,
                  orderNumber: 4,
                },
              ],
            },
            {
              question:
                "How many proofs of residency are required when applying?",
              explanation:
                "The handbook lists two proofs of residency, with exceptions noted.",
              category: "licensing",
              questionType: QuestionType.MULTIPLE_CHOICE,
              orderNumber: 2,
              answers: [
                { answerText: "Two", isCorrect: true, orderNumber: 1 },
                { answerText: "One", isCorrect: false, orderNumber: 2 },
                { answerText: "Three", isCorrect: false, orderNumber: 3 },
                { answerText: "None", isCorrect: false, orderNumber: 4 },
              ],
            },
            {
              question:
                "The application fee for an instruction permit is refundable if you fail the knowledge test.",
              explanation:
                "The handbook states you pay a non-refundable application fee.",
              category: "licensing",
              questionType: QuestionType.TRUE_FALSE,
              orderNumber: 3,
              answers: [
                { answerText: "True", isCorrect: false, orderNumber: 1 },
                { answerText: "False", isCorrect: true, orderNumber: 2 },
              ],
            },
            {
              question:
                "What is the minimum age to apply for a Class C instruction permit if under 18?",
              explanation:
                "The handbook states you must be at least 15½ years old.",
              category: "licensing",
              questionType: QuestionType.MULTIPLE_CHOICE,
              orderNumber: 4,
              answers: [
                { answerText: "15½ years old", isCorrect: true, orderNumber: 1 },
                { answerText: "14 years old", isCorrect: false, orderNumber: 2 },
                { answerText: "16 years old", isCorrect: false, orderNumber: 3 },
                { answerText: "18 years old", isCorrect: false, orderNumber: 4 },
              ],
            },
          ],
        },
        {
          title: "Getting Your Driver's License and Minor Restrictions",
          description:
            "Behind-the-wheel requirements and provisional license restrictions for minors.",
          estimatedDuration: 15,
          orderNumber: 2,
          blocks: [
            {
              type: ContentBlockType.HEADING,
              orderNumber: 1,
              content: { text: "Applying for a Driver's License", level: 1 },
            },
            {
              type: ContentBlockType.CHECKLIST,
              orderNumber: 2,
              content: {
                title: "Steps to Get Your License After Your Permit",
                items: [
                  "Practice driving with a California-licensed driver at least 18 (25 for minors)",
                  "Pass a behind-the-wheel drive test",
                ],
              },
            },
            {
              type: ContentBlockType.CALLOUT,
              orderNumber: 3,
              content: {
                title: "Additional Requirements for Minors Under 18",
                text: "Be at least 16, hold an instruction permit for at least 6 months (or turn 18), prove completion of driver education and training, and practice at least 50 hours with a licensed driver at least 25 years old — including 10 hours at night.",
                variant: "info",
              },
            },
            {
              type: ContentBlockType.HEADING,
              orderNumber: 4,
              content: { text: "Provisional License Restrictions", level: 2 },
            },
            {
              type: ContentBlockType.PARAGRAPH,
              orderNumber: 5,
              content: {
                text: "When you are under 18 years old, your driver's license will have the word provisional. As a provisional driver, you cannot drive between 11 p.m. and 5 a.m. during the first 12 months you have your license.",
              },
            },
            {
              type: ContentBlockType.CHECKLIST,
              orderNumber: 6,
              content: {
                title: "Other Provisional Restrictions",
                items: [
                  "No passengers under 20 unless a parent, guardian, or licensed driver at least 25 rides with you",
                  "Cannot drive for pay or operate commercial Class A, B, or C vehicles",
                ],
              },
            },
            {
              type: ContentBlockType.CALLOUT,
              orderNumber: 7,
              content: {
                title: "Exception Notes",
                text: "Exceptions exist for medical need, school activities, work, and immediate family needs — each requires a signed note with specific information as described in the handbook.",
                variant: "note",
              },
            },
          ],
          questions: [
            {
              question:
                "How many hours of supervised practice driving are required for minors?",
              explanation:
                "The handbook requires at least 50 hours, with 10 at night.",
              category: "licensing",
              questionType: QuestionType.MULTIPLE_CHOICE,
              orderNumber: 1,
              answers: [
                {
                  answerText: "At least 50 hours, including 10 at night",
                  isCorrect: true,
                  orderNumber: 1,
                },
                {
                  answerText: "At least 10 hours total",
                  isCorrect: false,
                  orderNumber: 2,
                },
                {
                  answerText: "At least 25 hours with no night requirement",
                  isCorrect: false,
                  orderNumber: 3,
                },
                {
                  answerText: "No practice hours required",
                  isCorrect: false,
                  orderNumber: 4,
                },
              ],
            },
            {
              question:
                "During the first 12 months of a provisional license, when are you prohibited from driving?",
              explanation:
                "Provisional drivers cannot drive between 11 p.m. and 5 a.m. during the first 12 months.",
              category: "licensing",
              questionType: QuestionType.MULTIPLE_CHOICE,
              orderNumber: 2,
              answers: [
                {
                  answerText: "Between 11 p.m. and 5 a.m.",
                  isCorrect: true,
                  orderNumber: 1,
                },
                {
                  answerText: "Between 9 p.m. and 6 a.m.",
                  isCorrect: false,
                  orderNumber: 2,
                },
                {
                  answerText: "Only on weekdays",
                  isCorrect: false,
                  orderNumber: 3,
                },
                {
                  answerText: "Never — there are no time restrictions",
                  isCorrect: false,
                  orderNumber: 4,
                },
              ],
            },
            {
              question:
                "A minor must hold an instruction permit for at least 6 months before scheduling a drive test.",
              explanation:
                "The handbook states minors need a permit for at least 6 months or until turning 18.",
              category: "licensing",
              questionType: QuestionType.TRUE_FALSE,
              orderNumber: 3,
              answers: [
                { answerText: "True", isCorrect: true, orderNumber: 1 },
                { answerText: "False", isCorrect: false, orderNumber: 2 },
              ],
            },
            {
              question:
                "Who must supervise a minor's practice driving hours?",
              explanation:
                "Practice must be with a California-licensed driver at least 25 years old.",
              category: "licensing",
              questionType: QuestionType.MULTIPLE_CHOICE,
              orderNumber: 4,
              answers: [
                {
                  answerText:
                    "A California-licensed driver at least 25 years old",
                  isCorrect: true,
                  orderNumber: 1,
                },
                {
                  answerText: "Any licensed driver at least 18",
                  isCorrect: false,
                  orderNumber: 2,
                },
                {
                  answerText: "Any adult family member",
                  isCorrect: false,
                  orderNumber: 3,
                },
                {
                  answerText: "A driving school instructor only",
                  isCorrect: false,
                  orderNumber: 4,
                },
              ],
            },
            {
              question:
                "Provisional drivers may carry passengers under 20 without restrictions.",
              explanation:
                "Passengers under 20 are restricted unless a qualifying adult rides along.",
              category: "licensing",
              questionType: QuestionType.TRUE_FALSE,
              orderNumber: 5,
              answers: [
                { answerText: "True", isCorrect: false, orderNumber: 1 },
                { answerText: "False", isCorrect: true, orderNumber: 2 },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export const unit03: UnitSeed = {
  title: "The Testing Process",
  description:
    "Vision, knowledge, and behind-the-wheel tests — requirements and vehicle checks.",
  orderNumber: 3,
  chapters: [
    {
      title: "DMV Tests Overview",
      description: "Vision, knowledge, and drive test rules.",
      orderNumber: 1,
      lessons: [
        {
          title: "Vision and Knowledge Tests",
          description:
            "Rules for vision screening and the written knowledge test.",
          estimatedDuration: 10,
          orderNumber: 1,
          blocks: [
            {
              type: ContentBlockType.HEADING,
              orderNumber: 1,
              content: { text: "Driver's License Tests", level: 1 },
            },
            {
              type: ContentBlockType.HEADING,
              orderNumber: 2,
              content: { text: "Vision Test", level: 2 },
            },
            {
              type: ContentBlockType.PARAGRAPH,
              orderNumber: 3,
              content: {
                text: "DMV tests all applicants to ensure they can see well enough to drive safely. If you take your vision test with corrective or contact lenses, your driver's license will have a corrective lenses restriction.",
              },
            },
            {
              type: ContentBlockType.HEADING,
              orderNumber: 4,
              content: { text: "Knowledge Test", level: 2 },
            },
            {
              type: ContentBlockType.PARAGRAPH,
              orderNumber: 5,
              content: {
                text: "When you apply for an original driver's license, you must pass a knowledge test with multiple choice questions. You are allowed three attempts to pass before you must reapply. Minors must wait seven days to retake a failed knowledge test, not including the day of the failure.",
              },
            },
            {
              type: ContentBlockType.CALLOUT,
              orderNumber: 6,
              content: {
                title: "Important",
                text: "You are not allowed to use any testing aids during knowledge tests, such as a California Driver's Handbook or cell phone.",
                variant: "warning",
              },
            },
          ],
          questions: [
            {
              question:
                "How many attempts are allowed on the knowledge test before reapplying?",
              explanation: "The handbook allows three attempts before reapplication.",
              category: "testing",
              questionType: QuestionType.MULTIPLE_CHOICE,
              orderNumber: 1,
              answers: [
                { answerText: "Three", isCorrect: true, orderNumber: 1 },
                { answerText: "One", isCorrect: false, orderNumber: 2 },
                { answerText: "Five", isCorrect: false, orderNumber: 3 },
                { answerText: "Unlimited", isCorrect: false, orderNumber: 4 },
              ],
            },
            {
              question:
                "You may use your cell phone during the knowledge test if you need to look up an answer.",
              explanation:
                "Testing aids including cell phones are not allowed during knowledge tests.",
              category: "testing",
              questionType: QuestionType.TRUE_FALSE,
              orderNumber: 2,
              answers: [
                { answerText: "True", isCorrect: false, orderNumber: 1 },
                { answerText: "False", isCorrect: true, orderNumber: 2 },
              ],
            },
            {
              question:
                "How long must minors wait to retake a failed knowledge test?",
              explanation:
                "Minors must wait seven days, not including the day of failure.",
              category: "testing",
              questionType: QuestionType.MULTIPLE_CHOICE,
              orderNumber: 3,
              answers: [
                {
                  answerText: "Seven days (not including day of failure)",
                  isCorrect: true,
                  orderNumber: 1,
                },
                {
                  answerText: "Fourteen days",
                  isCorrect: false,
                  orderNumber: 2,
                },
                {
                  answerText: "One day",
                  isCorrect: false,
                  orderNumber: 3,
                },
                {
                  answerText: "No waiting period",
                  isCorrect: false,
                  orderNumber: 4,
                },
              ],
            },
          ],
        },
        {
          title: "Behind-the-Wheel Drive Test",
          description:
            "What to bring, vehicle requirements, and drive test rules.",
          estimatedDuration: 15,
          orderNumber: 2,
          blocks: [
            {
              type: ContentBlockType.HEADING,
              orderNumber: 1,
              content: { text: "Behind-the-Wheel Drive Test", level: 1 },
            },
            {
              type: ContentBlockType.CHECKLIST,
              orderNumber: 2,
              content: {
                title: "Bring on Test Day",
                items: [
                  "Instruction permit or driver's license (if you have one)",
                  "A California-licensed driver at least 18 (25 for minors), unless already licensed",
                  "A vehicle that is safe to drive",
                  "Valid proof of insurance and vehicle registration",
                ],
              },
            },
            {
              type: ContentBlockType.CALLOUT,
              orderNumber: 3,
              content: {
                title: "Vehicle Safety Requirements",
                text: "Tires must have at least 1/32-inch of uniform tread depth. Donut tires are not allowed. The horn must be heard from at least 200 feet. Windshield cracks may postpone your test.",
                variant: "warning",
              },
            },
            {
              type: ContentBlockType.PARAGRAPH,
              orderNumber: 4,
              content: {
                text: "Only the examiner is allowed to accompany you during the drive test. Advanced driver assistance systems such as automated parallel parking, lane departure, and adaptive cruise control are not permitted during the drive test.",
              },
            },
            {
              type: ContentBlockType.CALLOUT,
              orderNumber: 5,
              content: {
                title: "Minor Retest Rule",
                text: "Minors must wait 14 days to retake a failed behind-the-wheel drive test, not including the day of the failure.",
                variant: "info",
              },
            },
          ],
          questions: [
            {
              question:
                "What is the minimum tire tread depth required for the drive test?",
              explanation:
                "The handbook requires at least 1/32-inch of uniform tread depth.",
              category: "testing",
              questionType: QuestionType.MULTIPLE_CHOICE,
              orderNumber: 1,
              answers: [
                {
                  answerText: "At least 1/32-inch",
                  isCorrect: true,
                  orderNumber: 1,
                },
                {
                  answerText: "At least 1/8-inch",
                  isCorrect: false,
                  orderNumber: 2,
                },
                {
                  answerText: "At least 1/4-inch",
                  isCorrect: false,
                  orderNumber: 3,
                },
                {
                  answerText: "No minimum specified",
                  isCorrect: false,
                  orderNumber: 4,
                },
              ],
            },
            {
              question:
                "Automated parallel parking may be used during the behind-the-wheel drive test.",
              explanation:
                "ADAS technologies including automated parallel parking are not permitted during the drive test.",
              category: "testing",
              questionType: QuestionType.TRUE_FALSE,
              orderNumber: 2,
              answers: [
                { answerText: "True", isCorrect: false, orderNumber: 1 },
                { answerText: "False", isCorrect: true, orderNumber: 2 },
              ],
            },
            {
              question:
                "How far must your horn be heard during the vehicle inspection?",
              explanation:
                "The horn must be loud enough to be heard from at least 200 feet.",
              category: "testing",
              questionType: QuestionType.MULTIPLE_CHOICE,
              orderNumber: 3,
              answers: [
                {
                  answerText: "At least 200 feet",
                  isCorrect: true,
                  orderNumber: 1,
                },
                {
                  answerText: "At least 100 feet",
                  isCorrect: false,
                  orderNumber: 2,
                },
                {
                  answerText: "At least 500 feet",
                  isCorrect: false,
                  orderNumber: 3,
                },
                {
                  answerText: "At least 50 feet",
                  isCorrect: false,
                  orderNumber: 4,
                },
              ],
            },
            {
              question:
                "How long must minors wait to retake a failed drive test?",
              explanation:
                "Minors must wait 14 days, not including the day of failure.",
              category: "testing",
              questionType: QuestionType.MULTIPLE_CHOICE,
              orderNumber: 4,
              answers: [
                {
                  answerText: "14 days (not including day of failure)",
                  isCorrect: true,
                  orderNumber: 1,
                },
                {
                  answerText: "7 days",
                  isCorrect: false,
                  orderNumber: 2,
                },
                {
                  answerText: "30 days",
                  isCorrect: false,
                  orderNumber: 3,
                },
                {
                  answerText: "Same day",
                  isCorrect: false,
                  orderNumber: 4,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
