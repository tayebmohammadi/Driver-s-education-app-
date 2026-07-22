import { ContentBlockType, QuestionType } from "@prisma/client";
import type { UnitSeed } from "../types";

export const unit11: UnitSeed = {
  title: "Vehicle Registration Requirements",
  description:
    "Registering vehicles in California, transfer deadlines when buying or selling, and out-of-state registration rules.",
  orderNumber: 11,
  chapters: [
    {
      title: "Buying and Selling Vehicles",
      description:
        "Transfer ownership deadlines and seller notification requirements.",
      orderNumber: 1,
      lessons: [
        {
          title: "Transferring Ownership When You Buy",
          description:
            "How and when to register a vehicle you purchase in California.",
          estimatedDuration: 8,
          orderNumber: 1,
          blocks: [
            {
              type: ContentBlockType.HEADING,
              orderNumber: 1,
              content: {
                text: "Registering Your Vehicle in California",
                level: 1,
              },
            },
            {
              type: ContentBlockType.PARAGRAPH,
              orderNumber: 2,
              content: {
                text: "You need to register your vehicle in California to use it in the state. For more information, visit dmv.ca.gov/vrservices.",
              },
            },
            {
              type: ContentBlockType.HEADING,
              orderNumber: 3,
              content: { text: "When You Buy a Vehicle", level: 2 },
            },
            {
              type: ContentBlockType.PARAGRAPH,
              orderNumber: 4,
              content: {
                text: "When you buy a vehicle, you have 10 days to transfer ownership to your name.",
              },
            },
            {
              type: ContentBlockType.CALLOUT,
              orderNumber: 5,
              content: {
                title: "California Requirements",
                text: "All vehicles registered in California are required to meet California requirements including vehicle emission controls in support of California's clean air standards. DMV cannot register a vehicle if it does not qualify.",
                variant: "info",
              },
            },
            {
              type: ContentBlockType.HEADING,
              orderNumber: 6,
              content: { text: "Lesson Summary", level: 2 },
            },
            {
              type: ContentBlockType.CHECKLIST,
              orderNumber: 7,
              content: {
                title: "Key Takeaways",
                items: [
                  "You must register your vehicle to use it in California.",
                  "Buyers have 10 days to transfer ownership to their name.",
                  "Vehicles must meet California emission and clean air standards.",
                  "DMV cannot register a vehicle that does not qualify.",
                ],
              },
            },
          ],
          questions: [
            {
              question:
                "How many days do you have to transfer ownership after buying a vehicle?",
              explanation:
                "Section 11 states you have 10 days to transfer ownership to your name when you buy a vehicle.",
              category: "registration",
              questionType: QuestionType.MULTIPLE_CHOICE,
              orderNumber: 1,
              answers: [
                { answerText: "10 days", isCorrect: true, orderNumber: 1 },
                { answerText: "5 days", isCorrect: false, orderNumber: 2 },
                { answerText: "20 days", isCorrect: false, orderNumber: 3 },
                { answerText: "30 days", isCorrect: false, orderNumber: 4 },
              ],
            },
            {
              question:
                "You need to register your vehicle in California to use it in the state.",
              explanation:
                "Section 11 opens by stating you need to register your vehicle in California to use it in the state.",
              category: "registration",
              questionType: QuestionType.TRUE_FALSE,
              orderNumber: 2,
              answers: [
                { answerText: "True", isCorrect: true, orderNumber: 1 },
                { answerText: "False", isCorrect: false, orderNumber: 2 },
              ],
            },
            {
              question:
                "Why might DMV refuse to register a vehicle in California?",
              explanation:
                "DMV cannot register a vehicle if it does not meet California emission controls and clean air standards.",
              category: "registration",
              questionType: QuestionType.MULTIPLE_CHOICE,
              orderNumber: 3,
              answers: [
                {
                  answerText:
                    "It does not meet California emission and clean air requirements",
                  isCorrect: true,
                  orderNumber: 1,
                },
                {
                  answerText: "The buyer is under 18 years old",
                  isCorrect: false,
                  orderNumber: 2,
                },
                {
                  answerText: "The vehicle is more than 10 years old",
                  isCorrect: false,
                  orderNumber: 3,
                },
                {
                  answerText: "The seller did not have a driver's license",
                  isCorrect: false,
                  orderNumber: 4,
                },
              ],
            },
            {
              question:
                "California vehicle registration requirements include meeting emission controls.",
              explanation:
                "All vehicles registered in California must meet California requirements including vehicle emission controls.",
              category: "registration",
              questionType: QuestionType.TRUE_FALSE,
              orderNumber: 4,
              answers: [
                { answerText: "True", isCorrect: true, orderNumber: 1 },
                { answerText: "False", isCorrect: false, orderNumber: 2 },
              ],
            },
          ],
        },
        {
          title: "Notifying DMV When You Sell",
          description:
            "Seller responsibilities and the Notice of Transfer and Release of Liability.",
          estimatedDuration: 7,
          orderNumber: 2,
          blocks: [
            {
              type: ContentBlockType.HEADING,
              orderNumber: 1,
              content: { text: "When You Sell a Vehicle", level: 1 },
            },
            {
              type: ContentBlockType.PARAGRAPH,
              orderNumber: 2,
              content: {
                text: "When you sell a vehicle, you must notify DMV within five days by completing a Notice of Transfer and Release of Liability at dmv.ca.gov/nrl.",
              },
            },
            {
              type: ContentBlockType.CALLOUT,
              orderNumber: 3,
              content: {
                title: "Protect Yourself",
                text: "Reporting the sale to DMV helps limit your liability for violations or incidents involving the vehicle after the date of sale.",
                variant: "warning",
              },
            },
            {
              type: ContentBlockType.QUOTE,
              orderNumber: 4,
              content: {
                text: "When you sell a vehicle, you must notify DMV within five days.",
                attribution: "California Driver's Handbook, Section 11",
              },
            },
            {
              type: ContentBlockType.CHECKLIST,
              orderNumber: 5,
              content: {
                title: "Seller Checklist",
                items: [
                  "Complete the Notice of Transfer and Release of Liability.",
                  "Submit the notice within five days of the sale.",
                  "Use dmv.ca.gov/nrl to complete the notice online.",
                ],
              },
            },
          ],
          questions: [
            {
              question:
                "How soon must you notify DMV after selling a vehicle?",
              explanation:
                "Section 11 requires sellers to notify DMV within five days of selling a vehicle.",
              category: "registration",
              questionType: QuestionType.MULTIPLE_CHOICE,
              orderNumber: 1,
              answers: [
                { answerText: "Within 5 days", isCorrect: true, orderNumber: 1 },
                { answerText: "Within 10 days", isCorrect: false, orderNumber: 2 },
                { answerText: "Within 20 days", isCorrect: false, orderNumber: 3 },
                { answerText: "Within 30 days", isCorrect: false, orderNumber: 4 },
              ],
            },
            {
              question:
                "Which form must a seller complete when transferring a vehicle?",
              explanation:
                "Sellers must complete a Notice of Transfer and Release of Liability at dmv.ca.gov/nrl.",
              category: "registration",
              questionType: QuestionType.MULTIPLE_CHOICE,
              orderNumber: 2,
              answers: [
                {
                  answerText:
                    "Notice of Transfer and Release of Liability",
                  isCorrect: true,
                  orderNumber: 1,
                },
                {
                  answerText: "Application for Duplicate Title only",
                  isCorrect: false,
                  orderNumber: 2,
                },
                {
                  answerText: "Driver License Application (DL 44)",
                  isCorrect: false,
                  orderNumber: 3,
                },
                {
                  answerText: "Report of Vision Examination (DL 62)",
                  isCorrect: false,
                  orderNumber: 4,
                },
              ],
            },
            {
              question:
                "Sellers have 10 days to notify DMV after selling a vehicle.",
              explanation:
                "Sellers must notify DMV within five days, not 10. Buyers have 10 days to transfer ownership.",
              category: "registration",
              questionType: QuestionType.TRUE_FALSE,
              orderNumber: 3,
              answers: [
                { answerText: "True", isCorrect: false, orderNumber: 1 },
                { answerText: "False", isCorrect: true, orderNumber: 2 },
              ],
            },
            {
              question:
                "Where can you complete the Notice of Transfer and Release of Liability?",
              explanation:
                "Section 11 directs sellers to complete the notice at dmv.ca.gov/nrl.",
              category: "registration",
              questionType: QuestionType.MULTIPLE_CHOICE,
              orderNumber: 4,
              answers: [
                { answerText: "dmv.ca.gov/nrl", isCorrect: true, orderNumber: 1 },
                {
                  answerText: "dmv.ca.gov/realid",
                  isCorrect: false,
                  orderNumber: 2,
                },
                {
                  answerText: "dmv.ca.gov/driver-ed",
                  isCorrect: false,
                  orderNumber: 3,
                },
                {
                  answerText: "dmv.ca.gov/id-cards only",
                  isCorrect: false,
                  orderNumber: 4,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      title: "Out-of-State Vehicles",
      description:
        "Registration deadlines for new California residents and out-of-state vehicles.",
      orderNumber: 2,
      lessons: [
        {
          title: "Registering an Out-of-State Vehicle",
          description:
            "Deadlines and requirements when you move to California or get a job here.",
          estimatedDuration: 8,
          orderNumber: 1,
          blocks: [
            {
              type: ContentBlockType.HEADING,
              orderNumber: 1,
              content: { text: "Out-of-State Vehicles", level: 1 },
            },
            {
              type: ContentBlockType.PARAGRAPH,
              orderNumber: 2,
              content: {
                text: "You have 20 days to register your vehicle after you become a resident or get a job in California. For more information, visit dmv.ca.gov/outofstatevr.",
              },
            },
            {
              type: ContentBlockType.CALLOUT,
              orderNumber: 3,
              content: {
                title: "California Standards",
                text: "All vehicles registered in California are required to meet California requirements including vehicle emission controls. DMV cannot register a vehicle if it does not qualify.",
                variant: "warning",
              },
            },
            {
              type: ContentBlockType.HEADING,
              orderNumber: 4,
              content: { text: "Lesson Summary", level: 2 },
            },
            {
              type: ContentBlockType.CHECKLIST,
              orderNumber: 5,
              content: {
                title: "Key Takeaways",
                items: [
                  "Out-of-state vehicles must be registered in California.",
                  "You have 20 days after becoming a resident or getting a job in California.",
                  "Vehicles must meet California emission and clean air standards.",
                  "Visit dmv.ca.gov/outofstatevr for more information.",
                ],
              },
            },
          ],
          questions: [
            {
              question:
                "How many days do you have to register your vehicle after becoming a California resident?",
              explanation:
                "Section 11 states you have 20 days to register after you become a resident or get a job in California.",
              category: "registration",
              questionType: QuestionType.MULTIPLE_CHOICE,
              orderNumber: 1,
              answers: [
                { answerText: "20 days", isCorrect: true, orderNumber: 1 },
                { answerText: "10 days", isCorrect: false, orderNumber: 2 },
                { answerText: "5 days", isCorrect: false, orderNumber: 3 },
                { answerText: "60 days", isCorrect: false, orderNumber: 4 },
              ],
            },
            {
              question:
                "The 20-day out-of-state registration deadline applies when you get a job in California.",
              explanation:
                "Section 11 applies the 20-day deadline when you become a resident or get a job in California.",
              category: "registration",
              questionType: QuestionType.TRUE_FALSE,
              orderNumber: 2,
              answers: [
                { answerText: "True", isCorrect: true, orderNumber: 1 },
                { answerText: "False", isCorrect: false, orderNumber: 2 },
              ],
            },
            {
              question:
                "Where can you find more information about out-of-state vehicle registration?",
              explanation:
                "Section 11 directs you to dmv.ca.gov/outofstatevr for more information.",
              category: "registration",
              questionType: QuestionType.MULTIPLE_CHOICE,
              orderNumber: 3,
              answers: [
                {
                  answerText: "dmv.ca.gov/outofstatevr",
                  isCorrect: true,
                  orderNumber: 1,
                },
                {
                  answerText: "dmv.ca.gov/nrl",
                  isCorrect: false,
                  orderNumber: 2,
                },
                {
                  answerText: "dmv.ca.gov/reexamination",
                  isCorrect: false,
                  orderNumber: 3,
                },
                {
                  answerText: "dmv.ca.gov/seniors",
                  isCorrect: false,
                  orderNumber: 4,
                },
              ],
            },
            {
              question:
                "Out-of-state vehicles may be registered in California even if they do not meet California emission standards.",
              explanation:
                "DMV cannot register a vehicle if it does not meet California emission controls and clean air standards.",
              category: "registration",
              questionType: QuestionType.TRUE_FALSE,
              orderNumber: 4,
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

export const unit12: UnitSeed = {
  title: "Driver Safety",
  description:
    "DMV reexamination process, priority reexamination deadlines, and license restrictions.",
  orderNumber: 12,
  chapters: [
    {
      title: "Reexamination Process",
      description:
        "When DMV may reexamine drivers and what actions may follow.",
      orderNumber: 1,
      lessons: [
        {
          title: "When DMV May Reexamine a Driver",
          description:
            "Grounds for reexamination and steps DMV may take.",
          estimatedDuration: 12,
          orderNumber: 1,
          blocks: [
            {
              type: ContentBlockType.HEADING,
              orderNumber: 1,
              content: { text: "Reexamination", level: 1 },
            },
            {
              type: ContentBlockType.PARAGRAPH,
              orderNumber: 2,
              content: {
                text: "The Vehicle Code allows DMV to investigate and reexamine every driver's ability to operate a motor vehicle safely. A physical or mental condition or poor driver's record can be the basis for a reexamination, not a driver's age.",
              },
            },
            {
              type: ContentBlockType.PARAGRAPH,
              orderNumber: 3,
              content: {
                text: "Drivers with a physical or mental condition can be referred to DMV by a physician, law enforcement, or family member by submitting a completed Request for Driver Reexamination form.",
              },
            },
            {
              type: ContentBlockType.CALLOUT,
              orderNumber: 4,
              content: {
                title: "Cognitive Disorders",
                text: "Cognitive disorders such as dementia, seizure disorder, brain tumor, Parkinson's disease, stroke, or vertigo present a significant challenge to safe driving. When a referral or diagnosis for mild cognitive impairment is received, the Driver Safety team will schedule a reexamination.",
                variant: "warning",
              },
            },
            {
              type: ContentBlockType.CHECKLIST,
              orderNumber: 5,
              content: {
                title: "Actions DMV May Take",
                items: [
                  "Request medical information from you or your physician.",
                  "Conduct an in-person or over-the-telephone reexamination.",
                  "Require knowledge, vision, or driving test(s).",
                  "Issue a limited term driver's license.",
                  "Immediately suspend or revoke your driving privilege if your condition presents an immediate threat to public safety.",
                  "Take no action against your driving privilege.",
                ],
              },
            },
          ],
          questions: [
            {
              question:
                "What can be the basis for a DMV reexamination?",
              explanation:
                "Section 12 states a physical or mental condition or poor driver's record can be the basis for reexamination, not a driver's age.",
              category: "driver-safety",
              questionType: QuestionType.MULTIPLE_CHOICE,
              orderNumber: 1,
              answers: [
                {
                  answerText:
                    "A physical or mental condition or poor driver's record",
                  isCorrect: true,
                  orderNumber: 1,
                },
                {
                  answerText: "Reaching a specific age",
                  isCorrect: false,
                  orderNumber: 2,
                },
                {
                  answerText: "Owning an out-of-state vehicle",
                  isCorrect: false,
                  orderNumber: 3,
                },
                {
                  answerText: "Renewing vehicle registration",
                  isCorrect: false,
                  orderNumber: 4,
                },
              ],
            },
            {
              question:
                "A driver's age alone can require a DMV reexamination.",
              explanation:
                "Section 12 explicitly states age is not the basis for a reexamination.",
              category: "driver-safety",
              questionType: QuestionType.TRUE_FALSE,
              orderNumber: 2,
              answers: [
                { answerText: "True", isCorrect: false, orderNumber: 1 },
                { answerText: "False", isCorrect: true, orderNumber: 2 },
              ],
            },
            {
              question:
                "Who may refer a driver to DMV for reexamination?",
              explanation:
                "Section 12 lists physicians, law enforcement, and family members as possible referrers.",
              category: "driver-safety",
              questionType: QuestionType.MULTIPLE_CHOICE,
              orderNumber: 3,
              answers: [
                {
                  answerText:
                    "A physician, law enforcement, or family member",
                  isCorrect: true,
                  orderNumber: 1,
                },
                {
                  answerText: "Only a DMV examiner",
                  isCorrect: false,
                  orderNumber: 2,
                },
                {
                  answerText: "Only the driver themselves",
                  isCorrect: false,
                  orderNumber: 3,
                },
                {
                  answerText: "Insurance companies only",
                  isCorrect: false,
                  orderNumber: 4,
                },
              ],
            },
            {
              question:
                "DMV may require a driver to take knowledge, vision, or driving tests during reexamination.",
              explanation:
                "Section 12 lists requiring knowledge, vision, or driving test(s) among actions DMV may take.",
              category: "driver-safety",
              questionType: QuestionType.TRUE_FALSE,
              orderNumber: 4,
              answers: [
                { answerText: "True", isCorrect: true, orderNumber: 1 },
                { answerText: "False", isCorrect: false, orderNumber: 2 },
              ],
            },
          ],
        },
        {
          title: "Priority Reexamination",
          description:
            "Law enforcement referrals and the five working day deadline.",
          estimatedDuration: 10,
          orderNumber: 2,
          blocks: [
            {
              type: ContentBlockType.HEADING,
              orderNumber: 1,
              content: { text: "Priority Reexamination", level: 1 },
            },
            {
              type: ContentBlockType.PARAGRAPH,
              orderNumber: 2,
              content: {
                text: "If you come in contact with law enforcement and receive a Notice of Priority Reexamination of Driver with a check mark in the top box, carefully read the form.",
              },
            },
            {
              type: ContentBlockType.CALLOUT,
              orderNumber: 3,
              content: {
                title: "Five Working Days",
                text: "You have five working days to contact DMV to initiate the process or your driving privilege will be automatically suspended.",
                variant: "warning",
              },
            },
            {
              type: ContentBlockType.PARAGRAPH,
              orderNumber: 4,
              content: {
                text: "If you do not call or appear within five working days, your privilege to drive in this state will be suspended until you satisfactorily complete a reexamination.",
              },
            },
            {
              type: ContentBlockType.QUOTE,
              orderNumber: 5,
              content: {
                text: "You have five working days to contact DMV to initiate the process or your driving privilege will be automatically suspended.",
                attribution: "California Driver's Handbook, Section 12",
              },
            },
          ],
          questions: [
            {
              question:
                "How long do you have to contact DMV after receiving a Notice of Priority Reexamination?",
              explanation:
                "Section 12 states you have five working days to contact DMV to initiate the process.",
              category: "driver-safety",
              questionType: QuestionType.MULTIPLE_CHOICE,
              orderNumber: 1,
              answers: [
                {
                  answerText: "Five working days",
                  isCorrect: true,
                  orderNumber: 1,
                },
                {
                  answerText: "Five calendar days",
                  isCorrect: false,
                  orderNumber: 2,
                },
                {
                  answerText: "Ten working days",
                  isCorrect: false,
                  orderNumber: 3,
                },
                {
                  answerText: "Twenty days",
                  isCorrect: false,
                  orderNumber: 4,
                },
              ],
            },
            {
              question:
                "What happens if you do not contact DMV within five working days after a priority reexamination notice?",
              explanation:
                "Your driving privilege will be automatically suspended until you satisfactorily complete a reexamination.",
              category: "driver-safety",
              questionType: QuestionType.MULTIPLE_CHOICE,
              orderNumber: 2,
              answers: [
                {
                  answerText:
                    "Your driving privilege will be automatically suspended",
                  isCorrect: true,
                  orderNumber: 1,
                },
                {
                  answerText: "You receive a warning letter only",
                  isCorrect: false,
                  orderNumber: 2,
                },
                {
                  answerText: "Your vehicle registration is canceled",
                  isCorrect: false,
                  orderNumber: 3,
                },
                {
                  answerText: "Nothing until your license expires",
                  isCorrect: false,
                  orderNumber: 4,
                },
              ],
            },
            {
              question:
                "A priority reexamination notice may be issued after contact with law enforcement.",
              explanation:
                "Section 12 describes receiving a Notice of Priority Reexamination of Driver from law enforcement.",
              category: "driver-safety",
              questionType: QuestionType.TRUE_FALSE,
              orderNumber: 3,
              answers: [
                { answerText: "True", isCorrect: true, orderNumber: 1 },
                { answerText: "False", isCorrect: false, orderNumber: 2 },
              ],
            },
            {
              question:
                "You should carefully read the form if you receive a Notice of Priority Reexamination with a check mark in the top box.",
              explanation:
                "Section 12 instructs drivers to carefully read the form when the top box is checked.",
              category: "driver-safety",
              questionType: QuestionType.TRUE_FALSE,
              orderNumber: 4,
              answers: [
                { answerText: "True", isCorrect: true, orderNumber: 1 },
                { answerText: "False", isCorrect: false, orderNumber: 2 },
              ],
            },
          ],
        },
      ],
    },
    {
      title: "License Restrictions",
      description:
        "How DMV places restrictions on a driver's license for safety.",
      orderNumber: 2,
      lessons: [
        {
          title: "Driver's License Restrictions",
          description:
            "Types of restrictions and how they are applied.",
          estimatedDuration: 10,
          orderNumber: 1,
          blocks: [
            {
              type: ContentBlockType.HEADING,
              orderNumber: 1,
              content: { text: "Driver's License Restrictions", level: 1 },
            },
            {
              type: ContentBlockType.PARAGRAPH,
              orderNumber: 2,
              content: {
                text: "DMV places restrictions on a driver's license to ensure a driver is operating a vehicle within their ability. Restrictions may be imposed by DMV or required by law. Restrictions placed on your driving privilege will be reasonable and necessary for your safety and the safety of others.",
              },
            },
            {
              type: ContentBlockType.CHECKLIST,
              orderNumber: 3,
              content: {
                title: "Examples of Restrictions",
                items: [
                  "Requiring special mechanical devices on the vehicle, such as hand controls.",
                  "Limiting when and where a person may drive, such as no night or freeway driving.",
                  "Requiring eyeglasses or corrective contact lenses.",
                  "Requiring additional devices, such as outside mirrors.",
                ],
              },
            },
            {
              type: ContentBlockType.CALLOUT,
              orderNumber: 4,
              content: {
                title: "Not Based on Age",
                text: "There are no specific restrictions for seniors. All restrictions are based on conditions, not age. Any restriction placed on your driver's license is based on the examiner's findings and recommendations.",
                variant: "info",
              },
            },
          ],
          questions: [
            {
              question:
                "Why does DMV place restrictions on a driver's license?",
              explanation:
                "Restrictions ensure a driver operates a vehicle within their ability and are reasonable for the safety of the driver and others.",
              category: "driver-safety",
              questionType: QuestionType.MULTIPLE_CHOICE,
              orderNumber: 1,
              answers: [
                {
                  answerText:
                    "To ensure the driver operates within their ability",
                  isCorrect: true,
                  orderNumber: 1,
                },
                {
                  answerText: "To increase registration fees",
                  isCorrect: false,
                  orderNumber: 2,
                },
                {
                  answerText: "Because the driver is over 70 years old",
                  isCorrect: false,
                  orderNumber: 3,
                },
                {
                  answerText: "To limit commercial driving only",
                  isCorrect: false,
                  orderNumber: 4,
                },
              ],
            },
            {
              question:
                "Which is an example of a license restriction listed in the handbook?",
              explanation:
                "Section 12 lists limiting when and where a person may drive, such as no night or freeway driving.",
              category: "driver-safety",
              questionType: QuestionType.MULTIPLE_CHOICE,
              orderNumber: 2,
              answers: [
                {
                  answerText: "No night or freeway driving",
                  isCorrect: true,
                  orderNumber: 1,
                },
                {
                  answerText: "No vehicle registration required",
                  isCorrect: false,
                  orderNumber: 2,
                },
                {
                  answerText: "No vision test at renewal",
                  isCorrect: false,
                  orderNumber: 3,
                },
                {
                  answerText: "No insurance required",
                  isCorrect: false,
                  orderNumber: 4,
                },
              ],
            },
            {
              question:
                "There are specific license restrictions applied to all senior drivers.",
              explanation:
                "Section 12 states there are no specific restrictions for seniors; restrictions are based on conditions, not age.",
              category: "driver-safety",
              questionType: QuestionType.TRUE_FALSE,
              orderNumber: 3,
              answers: [
                { answerText: "True", isCorrect: false, orderNumber: 1 },
                { answerText: "False", isCorrect: true, orderNumber: 2 },
              ],
            },
            {
              question:
                "Requiring eyeglasses or corrective contact lenses may be a license restriction.",
              explanation:
                "Section 12 lists requiring eyeglasses or corrective contact lenses as an example restriction.",
              category: "driver-safety",
              questionType: QuestionType.TRUE_FALSE,
              orderNumber: 4,
              answers: [
                { answerText: "True", isCorrect: true, orderNumber: 1 },
                { answerText: "False", isCorrect: false, orderNumber: 2 },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export const unit13: UnitSeed = {
  title: "Seniors and Driving",
  description:
    "Warning signs of unsafe driving, renewal rules at 70+, the Mature Driver Program, and Senior ID cards.",
  orderNumber: 13,
  chapters: [
    {
      title: "Safe Driving for Seniors",
      description:
        "Recognizing warning signs and renewal requirements for older drivers.",
      orderNumber: 1,
      lessons: [
        {
          title: "Warning Signs of an Unsafe Driver",
          description:
            "Physical, visual, and mental changes that may affect driving safety.",
          estimatedDuration: 10,
          orderNumber: 1,
          blocks: [
            {
              type: ContentBlockType.HEADING,
              orderNumber: 1,
              content: { text: "Seniors and Driving", level: 1 },
            },
            {
              type: ContentBlockType.PARAGRAPH,
              orderNumber: 2,
              content: {
                text: "Senior drivers often have unique needs and concerns about driving. Driving requires certain physical, visual, and mental abilities. We all want to continue driving as long as we can. However, the time may come when we must limit or stop driving temporarily or permanently.",
              },
            },
            {
              type: ContentBlockType.HEADING,
              orderNumber: 3,
              content: { text: "Warning Signs", level: 2 },
            },
            {
              type: ContentBlockType.CHECKLIST,
              orderNumber: 4,
              content: {
                title: "Warning Signs of an Unsafe Driver",
                items: [
                  "Getting lost in familiar places.",
                  "Dents and scrapes on the car, fences, mailbox, garage doors, etc.",
                  "Frequent close calls or collisions.",
                  "Limiting or not driving at night.",
                  "Driving during the time of day when traffic is light.",
                  "Avoiding difficult intersections.",
                  "Driving for short distances or limiting driving to essential places.",
                  "No freeway driving.",
                  "Installing an additional right-side mirror.",
                ],
              },
            },
            {
              type: ContentBlockType.CALLOUT,
              orderNumber: 5,
              content: {
                title: "Self-Assessment",
                text: "To get the Driver Skills Self-Assessment Questionnaire, visit dmv.ca.gov/driver-skills.",
                variant: "tip",
              },
            },
          ],
          questions: [
            {
              question:
                "Which is a warning sign of an unsafe driver listed in the handbook?",
              explanation:
                "Section 13 lists getting lost in familiar places as a warning sign of an unsafe driver.",
              category: "seniors",
              questionType: QuestionType.MULTIPLE_CHOICE,
              orderNumber: 1,
              answers: [
                {
                  answerText: "Getting lost in familiar places",
                  isCorrect: true,
                  orderNumber: 1,
                },
                {
                  answerText: "Renewing registration on time",
                  isCorrect: false,
                  orderNumber: 2,
                },
                {
                  answerText: "Using turn signals consistently",
                  isCorrect: false,
                  orderNumber: 3,
                },
                {
                  answerText: "Maintaining the speed limit",
                  isCorrect: false,
                  orderNumber: 4,
                },
              ],
            },
            {
              question:
                "Frequent close calls or collisions may indicate an unsafe driver.",
              explanation:
                "Section 13 lists frequent close calls or collisions among warning signs.",
              category: "seniors",
              questionType: QuestionType.TRUE_FALSE,
              orderNumber: 2,
              answers: [
                { answerText: "True", isCorrect: true, orderNumber: 1 },
                { answerText: "False", isCorrect: false, orderNumber: 2 },
              ],
            },
            {
              question:
                "Which behavior suggests a senior driver may be limiting driving due to safety concerns?",
              explanation:
                "Section 13 lists avoiding difficult intersections and limiting driving to essential places as warning signs.",
              category: "seniors",
              questionType: QuestionType.MULTIPLE_CHOICE,
              orderNumber: 3,
              answers: [
                {
                  answerText: "Avoiding difficult intersections",
                  isCorrect: true,
                  orderNumber: 1,
                },
                {
                  answerText: "Driving only on freeways",
                  isCorrect: false,
                  orderNumber: 2,
                },
                {
                  answerText: "Driving only at night",
                  isCorrect: false,
                  orderNumber: 3,
                },
                {
                  answerText: "Removing side mirrors",
                  isCorrect: false,
                  orderNumber: 4,
                },
              ],
            },
            {
              question:
                "Dents and scrapes on the car or garage may be a warning sign of unsafe driving.",
              explanation:
                "Section 13 lists dents and scrapes on the car, fences, mailbox, or garage doors as warning signs.",
              category: "seniors",
              questionType: QuestionType.TRUE_FALSE,
              orderNumber: 4,
              answers: [
                { answerText: "True", isCorrect: true, orderNumber: 1 },
                { answerText: "False", isCorrect: false, orderNumber: 2 },
              ],
            },
          ],
        },
        {
          title: "Driver's License Renewal at 70 and Older",
          description:
            "In-person renewal, vision tests, and renewal notices.",
          estimatedDuration: 10,
          orderNumber: 2,
          blocks: [
            {
              type: ContentBlockType.HEADING,
              orderNumber: 1,
              content: { text: "Driver's License Renewal", level: 1 },
            },
            {
              type: ContentBlockType.PARAGRAPH,
              orderNumber: 2,
              content: {
                text: "If you are 70 years old or older at the time your driver's license expires, you are required to renew your driver's license in person, unless otherwise instructed by DMV. Knowledge and vision tests are required.",
              },
            },
            {
              type: ContentBlockType.PARAGRAPH,
              orderNumber: 3,
              content: {
                text: "If you do not pass, you may be issued a temporary driver's license. DMV sends a renewal notice to your address of record about 60 days before your driver's license expires.",
              },
            },
            {
              type: ContentBlockType.CALLOUT,
              orderNumber: 4,
              content: {
                title: "No Renewal Notice?",
                text: "If you do not receive a renewal notice, complete a Driver License or Identification Card Application at dmv.ca.gov/dlservices or at a DMV office. Visit dmv.ca.gov/driver-ed for more information and sample tests.",
                variant: "info",
              },
            },
          ],
          questions: [
            {
              question:
                "How must drivers 70 or older renew their license when it expires?",
              explanation:
                "Section 13 requires drivers 70 or older to renew in person unless otherwise instructed by DMV.",
              category: "seniors",
              questionType: QuestionType.MULTIPLE_CHOICE,
              orderNumber: 1,
              answers: [
                {
                  answerText: "In person at a DMV office",
                  isCorrect: true,
                  orderNumber: 1,
                },
                {
                  answerText: "By mail only",
                  isCorrect: false,
                  orderNumber: 2,
                },
                {
                  answerText: "Online without any tests",
                  isCorrect: false,
                  orderNumber: 3,
                },
                {
                  answerText: "Through an insurance agent",
                  isCorrect: false,
                  orderNumber: 4,
                },
              ],
            },
            {
              question:
                "Which tests are required when renewing at age 70 or older?",
              explanation:
                "Section 13 states knowledge and vision tests are required.",
              category: "seniors",
              questionType: QuestionType.MULTIPLE_CHOICE,
              orderNumber: 2,
              answers: [
                {
                  answerText: "Knowledge and vision tests",
                  isCorrect: true,
                  orderNumber: 1,
                },
                {
                  answerText: "Only a behind-the-wheel test",
                  isCorrect: false,
                  orderNumber: 2,
                },
                {
                  answerText: "No tests are required",
                  isCorrect: false,
                  orderNumber: 3,
                },
                {
                  answerText: "Only a hearing test",
                  isCorrect: false,
                  orderNumber: 4,
                },
              ],
            },
            {
              question:
                "DMV sends a renewal notice about 60 days before a license expires.",
              explanation:
                "Section 13 states DMV sends a renewal notice about 60 days before expiration.",
              category: "seniors",
              questionType: QuestionType.TRUE_FALSE,
              orderNumber: 3,
              answers: [
                { answerText: "True", isCorrect: true, orderNumber: 1 },
                { answerText: "False", isCorrect: false, orderNumber: 2 },
              ],
            },
            {
              question:
                "If you do not pass renewal tests at age 70 or older, you may be issued a temporary driver's license.",
              explanation:
                "Section 13 states if you do not pass, you may be issued a temporary driver's license.",
              category: "seniors",
              questionType: QuestionType.TRUE_FALSE,
              orderNumber: 4,
              answers: [
                { answerText: "True", isCorrect: true, orderNumber: 1 },
                { answerText: "False", isCorrect: false, orderNumber: 2 },
              ],
            },
          ],
        },
      ],
    },
    {
      title: "Programs and Identification",
      description:
        "Mature Driver Program benefits and Senior ID card eligibility.",
      orderNumber: 2,
      lessons: [
        {
          title: "Mature Driver Program",
          description:
            "Course requirements, insurance discounts, and certificate renewal.",
          estimatedDuration: 8,
          orderNumber: 1,
          blocks: [
            {
              type: ContentBlockType.HEADING,
              orderNumber: 1,
              content: { text: "Mature Driver Program", level: 1 },
            },
            {
              type: ContentBlockType.PARAGRAPH,
              orderNumber: 2,
              content: {
                text: "The Mature Driver Improvement Program is an eight-hour course for drivers 55 years old and older. It covers a range of topics that are of special interest to mature drivers.",
              },
            },
            {
              type: ContentBlockType.PARAGRAPH,
              orderNumber: 3,
              content: {
                text: "Your insurance company may offer discounts if you complete the program. Contact your insurance provider with a copy of your completion certificate. Your certificate is valid for three years. You can renew it by completing another four-hour course.",
              },
            },
            {
              type: ContentBlockType.CALLOUT,
              orderNumber: 4,
              content: {
                title: "Find a Course",
                text: "You can take the course through DMV-approved providers. Visit dmv.ca.gov/seniors for more information, including locations near you.",
                variant: "tip",
              },
            },
          ],
          questions: [
            {
              question:
                "Who is eligible for the Mature Driver Improvement Program?",
              explanation:
                "Section 13 describes an eight-hour course for drivers 55 years old and older.",
              category: "seniors",
              questionType: QuestionType.MULTIPLE_CHOICE,
              orderNumber: 1,
              answers: [
                {
                  answerText: "Drivers 55 years old and older",
                  isCorrect: true,
                  orderNumber: 1,
                },
                {
                  answerText: "Drivers 62 years old and older only",
                  isCorrect: false,
                  orderNumber: 2,
                },
                {
                  answerText: "Drivers 70 years old and older only",
                  isCorrect: false,
                  orderNumber: 3,
                },
                {
                  answerText: "Provisional drivers under 18",
                  isCorrect: false,
                  orderNumber: 4,
                },
              ],
            },
            {
              question:
                "How long is the initial Mature Driver Improvement Program course?",
              explanation:
                "Section 13 states the program is an eight-hour course.",
              category: "seniors",
              questionType: QuestionType.MULTIPLE_CHOICE,
              orderNumber: 2,
              answers: [
                { answerText: "8 hours", isCorrect: true, orderNumber: 1 },
                { answerText: "4 hours", isCorrect: false, orderNumber: 2 },
                { answerText: "12 hours", isCorrect: false, orderNumber: 3 },
                { answerText: "2 hours", isCorrect: false, orderNumber: 4 },
              ],
            },
            {
              question:
                "A Mature Driver Program completion certificate is valid for three years.",
              explanation:
                "Section 13 states your certificate is valid for three years.",
              category: "seniors",
              questionType: QuestionType.TRUE_FALSE,
              orderNumber: 3,
              answers: [
                { answerText: "True", isCorrect: true, orderNumber: 1 },
                { answerText: "False", isCorrect: false, orderNumber: 2 },
              ],
            },
            {
              question:
                "How can you renew your Mature Driver Program certificate?",
              explanation:
                "Section 13 states you can renew the certificate by completing another four-hour course.",
              category: "seniors",
              questionType: QuestionType.MULTIPLE_CHOICE,
              orderNumber: 4,
              answers: [
                {
                  answerText: "By completing another four-hour course",
                  isCorrect: true,
                  orderNumber: 1,
                },
                {
                  answerText: "By retaking the full eight-hour course only",
                  isCorrect: false,
                  orderNumber: 2,
                },
                {
                  answerText: "By passing a behind-the-wheel test",
                  isCorrect: false,
                  orderNumber: 3,
                },
                {
                  answerText: "Certificates cannot be renewed",
                  isCorrect: false,
                  orderNumber: 4,
                },
              ],
            },
          ],
        },
        {
          title: "Senior ID Cards",
          description:
            "No-fee Senior ID cards and identification-only use.",
          estimatedDuration: 7,
          orderNumber: 2,
          blocks: [
            {
              type: ContentBlockType.HEADING,
              orderNumber: 1,
              content: { text: "Senior ID Cards", level: 1 },
            },
            {
              type: ContentBlockType.PARAGRAPH,
              orderNumber: 2,
              content: {
                text: "If you are 62 years old or older, you are eligible for a no-fee Senior ID card.",
              },
            },
            {
              type: ContentBlockType.PARAGRAPH,
              orderNumber: 3,
              content: {
                text: "Drivers of any age who are unable to continue driving safely due to a physical or mental condition may be eligible to exchange their driver's license for a no-fee ID card. The ID card serves as identification only.",
              },
            },
            {
              type: ContentBlockType.CALLOUT,
              orderNumber: 4,
              content: {
                title: "More Information",
                text: "Details may be found at dmv.ca.gov/id-cards.",
                variant: "info",
              },
            },
          ],
          questions: [
            {
              question:
                "At what age are you eligible for a no-fee Senior ID card?",
              explanation:
                "Section 13 states if you are 62 years old or older, you are eligible for a no-fee Senior ID card.",
              category: "seniors",
              questionType: QuestionType.MULTIPLE_CHOICE,
              orderNumber: 1,
              answers: [
                { answerText: "62 years old or older", isCorrect: true, orderNumber: 1 },
                { answerText: "55 years old or older", isCorrect: false, orderNumber: 2 },
                { answerText: "70 years old or older", isCorrect: false, orderNumber: 3 },
                { answerText: "65 years old or older", isCorrect: false, orderNumber: 4 },
              ],
            },
            {
              question: "What is true about a Senior ID card?",
              explanation:
                "Section 13 states the ID card serves as identification only.",
              category: "seniors",
              questionType: QuestionType.MULTIPLE_CHOICE,
              orderNumber: 2,
              answers: [
                {
                  answerText: "It serves as identification only",
                  isCorrect: true,
                  orderNumber: 1,
                },
                {
                  answerText: "It permits you to drive",
                  isCorrect: false,
                  orderNumber: 2,
                },
                {
                  answerText: "It replaces vehicle registration",
                  isCorrect: false,
                  orderNumber: 3,
                },
                {
                  answerText: "It is valid for one year only",
                  isCorrect: false,
                  orderNumber: 4,
                },
              ],
            },
            {
              question:
                "A driver unable to continue driving safely due to a physical or mental condition may exchange their license for a no-fee ID card.",
              explanation:
                "Section 13 states drivers of any age who cannot continue driving safely may be eligible to exchange their license for a no-fee ID card.",
              category: "seniors",
              questionType: QuestionType.TRUE_FALSE,
              orderNumber: 3,
              answers: [
                { answerText: "True", isCorrect: true, orderNumber: 1 },
                { answerText: "False", isCorrect: false, orderNumber: 2 },
              ],
            },
            {
              question:
                "Senior ID cards are available only to drivers who have never held a license.",
              explanation:
                "Section 13 describes eligibility at 62+ and exchange options for drivers who can no longer drive safely — not limited to never-licensed persons.",
              category: "seniors",
              questionType: QuestionType.TRUE_FALSE,
              orderNumber: 4,
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
