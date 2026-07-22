import { ContentBlockType, QuestionType } from "@prisma/client";
import type { UnitSeed } from "../types";

export const unit04: UnitSeed = {
  title: "Changing, Replacing, and Renewing Your Driver's License",
  description:
    "Address changes, license renewal and replacement, and out-of-state extensions.",
  orderNumber: 4,
  chapters: [
    {
      title: "Keeping Your License Current",
      description:
        "How to update your license information and notify DMV of address changes.",
      orderNumber: 1,
      lessons: [
        {
          title: "Changes to Your License and Address",
          description:
            "Updating your license information and reporting address changes within ten days.",
          estimatedDuration: 8,
          orderNumber: 1,
          blocks: [
            {
              type: ContentBlockType.HEADING,
              orderNumber: 1,
              content: { text: "Changes to Your License", level: 1 },
            },
            {
              type: ContentBlockType.PARAGRAPH,
              orderNumber: 2,
              content: {
                text: "If you legally change your name or need an update to your driver's license, such as your physical description or gender identity, visit dmv.ca.gov/dlservices.",
              },
            },
            {
              type: ContentBlockType.HEADING,
              orderNumber: 3,
              content: { text: "Change Your Address", level: 2 },
            },
            {
              type: ContentBlockType.PARAGRAPH,
              orderNumber: 4,
              content: {
                text: "If you move, you must notify DMV of your new address within ten days. Submit a change of address online at dmv.ca.gov/addresschange or by mail. It is your responsibility to ensure DMV has your correct mailing address on record.",
              },
            },
            {
              type: ContentBlockType.CALLOUT,
              orderNumber: 5,
              content: {
                title: "DMV Rule",
                text: "You do not automatically get a new driver's license when you change your address. You may request a replacement for a fee.",
                variant: "info",
              },
            },
            {
              type: ContentBlockType.CHECKLIST,
              orderNumber: 6,
              content: {
                title: "Address Change Requirements",
                items: [
                  "Notify DMV within ten days of moving.",
                  "Submit online at dmv.ca.gov/addresschange or by mail.",
                  "Ensure DMV has your correct mailing address on record.",
                  "Request a replacement card separately if you want one showing your new address.",
                ],
              },
            },
            {
              type: ContentBlockType.QUOTE,
              orderNumber: 7,
              content: {
                text: "It is your responsibility to ensure DMV has your correct mailing address on record.",
                attribution: "California Driver's Handbook, Section 4",
              },
            },
          ],
          questions: [
            {
              question:
                "How many days do you have to notify DMV after changing your address?",
              explanation:
                "The handbook states you must notify DMV of your new address within ten days.",
              category: "licensing",
              questionType: QuestionType.MULTIPLE_CHOICE,
              orderNumber: 1,
              answers: [
                { answerText: "Ten days", isCorrect: true, orderNumber: 1 },
                { answerText: "Five days", isCorrect: false, orderNumber: 2 },
                { answerText: "Thirty days", isCorrect: false, orderNumber: 3 },
                { answerText: "Ninety days", isCorrect: false, orderNumber: 4 },
              ],
            },
            {
              question:
                "You automatically receive a new driver's license when you change your address.",
              explanation:
                "The handbook states you do not automatically get a new driver's license when you change your address.",
              category: "licensing",
              questionType: QuestionType.TRUE_FALSE,
              orderNumber: 2,
              answers: [
                { answerText: "True", isCorrect: false, orderNumber: 1 },
                { answerText: "False", isCorrect: true, orderNumber: 2 },
              ],
            },
            {
              question:
                "Where can you submit a change of address to DMV?",
              explanation:
                "The handbook lists dmv.ca.gov/addresschange online or by mail.",
              category: "licensing",
              questionType: QuestionType.MULTIPLE_CHOICE,
              orderNumber: 3,
              answers: [
                {
                  answerText:
                    "Online at dmv.ca.gov/addresschange or by mail",
                  isCorrect: true,
                  orderNumber: 1,
                },
                {
                  answerText: "Only in person at a DMV office",
                  isCorrect: false,
                  orderNumber: 2,
                },
                {
                  answerText: "By phone only",
                  isCorrect: false,
                  orderNumber: 3,
                },
                {
                  answerText: "No notification is required",
                  isCorrect: false,
                  orderNumber: 4,
                },
              ],
            },
          ],
        },
        {
          title: "Renew, Replace, and Extend Your License",
          description:
            "Rules for renewing or replacing your license and requesting an out-of-state extension.",
          estimatedDuration: 10,
          orderNumber: 2,
          blocks: [
            {
              type: ContentBlockType.HEADING,
              orderNumber: 1,
              content: { text: "Replace or Renew Your Driver's License", level: 1 },
            },
            {
              type: ContentBlockType.PARAGRAPH,
              orderNumber: 2,
              content: {
                text: "It is against the law to drive with an expired driver's license. To renew or replace a lost, stolen, or damaged driver's license, visit dmv.ca.gov/dlservices, or a DMV office.",
              },
            },
            {
              type: ContentBlockType.CALLOUT,
              orderNumber: 3,
              content: {
                title: "Important",
                text: "Before DMV can issue you a driver's license, you may need to provide additional proof of your identity. If you are a minor, your parent or guardian must sign the application.",
                variant: "warning",
              },
            },
            {
              type: ContentBlockType.PARAGRAPH,
              orderNumber: 4,
              content: {
                text: "Once you receive your replacement card, your old card is no longer valid. If you find the old card, destroy it.",
              },
            },
            {
              type: ContentBlockType.HEADING,
              orderNumber: 5,
              content: { text: "Extend Your Driver's License", level: 2 },
            },
            {
              type: ContentBlockType.PARAGRAPH,
              orderNumber: 6,
              content: {
                text: "If you are out-of-state and cannot renew, you may request a one year extension of your driver's license. Before your driver's license expires, submit a request with your name, driver's license number, birth date, California residence address, and out-of-state address to dl-extensions@dmv.ca.gov.",
              },
            },
            {
              type: ContentBlockType.CALLOUT,
              orderNumber: 7,
              content: {
                title: "Note",
                text: "Limited-term driver's licenses are not eligible for this extension.",
                variant: "note",
              },
            },
            {
              type: ContentBlockType.CHECKLIST,
              orderNumber: 8,
              content: {
                title: "Extension Request Must Include",
                items: [
                  "Your name",
                  "Driver's license number",
                  "Birth date",
                  "California residence address",
                  "Out-of-state address",
                ],
              },
            },
          ],
          questions: [
            {
              question: "Is it legal to drive with an expired driver's license?",
              explanation:
                "The handbook states it is against the law to drive with an expired driver's license.",
              category: "licensing",
              questionType: QuestionType.TRUE_FALSE,
              orderNumber: 1,
              answers: [
                { answerText: "True", isCorrect: false, orderNumber: 1 },
                { answerText: "False", isCorrect: true, orderNumber: 2 },
              ],
            },
            {
              question:
                "What should you do with your old driver's license after receiving a replacement?",
              explanation:
                "The handbook states your old card is no longer valid and you should destroy it if found.",
              category: "licensing",
              questionType: QuestionType.MULTIPLE_CHOICE,
              orderNumber: 2,
              answers: [
                {
                  answerText: "Destroy it — it is no longer valid",
                  isCorrect: true,
                  orderNumber: 1,
                },
                {
                  answerText: "Keep it as a backup",
                  isCorrect: false,
                  orderNumber: 2,
                },
                {
                  answerText: "Give it to a friend",
                  isCorrect: false,
                  orderNumber: 3,
                },
                {
                  answerText: "Mail it to DMV",
                  isCorrect: false,
                  orderNumber: 4,
                },
              ],
            },
            {
              question:
                "If you are out-of-state and cannot renew, how long may you request to extend your license?",
              explanation:
                "The handbook allows a one year extension when out-of-state and unable to renew.",
              category: "licensing",
              questionType: QuestionType.MULTIPLE_CHOICE,
              orderNumber: 3,
              answers: [
                { answerText: "One year", isCorrect: true, orderNumber: 1 },
                { answerText: "Six months", isCorrect: false, orderNumber: 2 },
                { answerText: "Two years", isCorrect: false, orderNumber: 3 },
                { answerText: "Ninety days", isCorrect: false, orderNumber: 4 },
              ],
            },
            {
              question:
                "Limited-term driver's licenses are eligible for an out-of-state extension.",
              explanation:
                "The handbook notes limited-term driver's licenses are not eligible for this extension.",
              category: "licensing",
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

export const unit05: UnitSeed = {
  title: "An Introduction to Driving",
  description:
    "Health and fitness to drive, steering methods, and using signals, horns, and headlights.",
  orderNumber: 5,
  chapters: [
    {
      title: "Health and Vehicle Control",
      description:
        "How your health affects driving and proper steering techniques.",
      orderNumber: 1,
      lessons: [
        {
          title: "Health and Driving Fitness",
          description:
            "Vision, hearing, fatigue, medications, and physical and mental alertness.",
          estimatedDuration: 12,
          orderNumber: 1,
          blocks: [
            {
              type: ContentBlockType.HEADING,
              orderNumber: 1,
              content: { text: "Your Health and Driving", level: 1 },
            },
            {
              type: ContentBlockType.PARAGRAPH,
              orderNumber: 2,
              content: {
                text: "Your health may affect your driving. Vision – You must be able to notice hazards in different types of lighting, judge distances, adjust to traffic speed, and read road signs.",
              },
            },
            {
              type: ContentBlockType.PARAGRAPH,
              orderNumber: 3,
              content: {
                text: "Hearing – You must be able to hear horns, sirens, motorcycles, or screeching tires that may alert you of hazards. It is illegal to wear a headset or earplugs in both ears while driving.",
              },
            },
            {
              type: ContentBlockType.CALLOUT,
              orderNumber: 4,
              content: {
                title: "Fatigue Warning",
                text: "Fatigue and drowsiness can affect your vision and increase reaction time to hazards.",
                variant: "warning",
              },
            },
            {
              type: ContentBlockType.PARAGRAPH,
              orderNumber: 5,
              content: {
                text: "Medications – Prescription and over-the-counter medications can make you an unsafe driver. Some medicines can make you sleepy. It is your responsibility to know the effects of the medications you take.",
              },
            },
            {
              type: ContentBlockType.CHECKLIST,
              orderNumber: 6,
              content: {
                title: "Health Requirements for Safe Driving",
                items: [
                  "Notice hazards in different lighting and judge distances.",
                  "Hear horns, sirens, and other warning sounds.",
                  "Stay alert to decide the correct course of action quickly.",
                  "Know the effects of any medications you take.",
                ],
              },
            },
            {
              type: ContentBlockType.QUOTE,
              orderNumber: 7,
              content: {
                text: "It is your responsibility to know the effects of the medications you take.",
                attribution: "California Driver's Handbook, Section 5",
              },
            },
          ],
          questions: [
            {
              question:
                "Is it legal to wear a headset or earplugs in both ears while driving?",
              explanation:
                "The handbook states it is illegal to wear a headset or earplugs in both ears while driving.",
              category: "driving-basics",
              questionType: QuestionType.TRUE_FALSE,
              orderNumber: 1,
              answers: [
                { answerText: "True", isCorrect: false, orderNumber: 1 },
                { answerText: "False", isCorrect: true, orderNumber: 2 },
              ],
            },
            {
              question:
                "Who is responsible for knowing the effects of medications on driving?",
              explanation:
                "The handbook states it is your responsibility to know the effects of the medications you take.",
              category: "driving-basics",
              questionType: QuestionType.MULTIPLE_CHOICE,
              orderNumber: 2,
              answers: [
                {
                  answerText: "The driver",
                  isCorrect: true,
                  orderNumber: 1,
                },
                {
                  answerText: "The pharmacist only",
                  isCorrect: false,
                  orderNumber: 2,
                },
                {
                  answerText: "The DMV",
                  isCorrect: false,
                  orderNumber: 3,
                },
                {
                  answerText: "Your physician only",
                  isCorrect: false,
                  orderNumber: 4,
                },
              ],
            },
            {
              question:
                "Fatigue and drowsiness can affect your vision and increase reaction time.",
              explanation:
                "Section 5 states fatigue and drowsiness can affect vision and increase reaction time to hazards.",
              category: "driving-basics",
              questionType: QuestionType.TRUE_FALSE,
              orderNumber: 3,
              answers: [
                { answerText: "True", isCorrect: true, orderNumber: 1 },
                { answerText: "False", isCorrect: false, orderNumber: 2 },
              ],
            },
            {
              question:
                "Physicians are required to report patients at least 14 years old to DMV if medical conditions may affect safe driving.",
              explanation:
                "The handbook states physicians are required to report patients who are at least 14 years old if they believe medical conditions may affect safe driving.",
              category: "driving-basics",
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
          title: "Steering Methods",
          description:
            "Hand-to-hand, hand-over-hand, and one-hand steering techniques.",
          estimatedDuration: 10,
          orderNumber: 2,
          blocks: [
            {
              type: ContentBlockType.HEADING,
              orderNumber: 1,
              content: { text: "Controlling the Vehicle", level: 1 },
            },
            {
              type: ContentBlockType.PARAGRAPH,
              orderNumber: 2,
              content: {
                text: "To control your vehicle, it is critical to keep both hands on the wheel whenever possible.",
              },
            },
            {
              type: ContentBlockType.HEADING,
              orderNumber: 3,
              content: { text: "Hand-to-Hand Steering (Push/Pull)", level: 2 },
            },
            {
              type: ContentBlockType.CHECKLIST,
              orderNumber: 4,
              content: {
                title: "Hand-to-Hand Method",
                items: [
                  "Start with your hands at 9 and 3 o'clock or 8 and 4 o'clock.",
                  "Do not cross your hands over the middle of the steering wheel.",
                  "Keep your hands in these positions, even when making turns.",
                ],
              },
            },
            {
              type: ContentBlockType.HEADING,
              orderNumber: 5,
              content: { text: "Hand-Over-Hand Steering", level: 2 },
            },
            {
              type: ContentBlockType.PARAGRAPH,
              orderNumber: 6,
              content: {
                text: "Use hand-over-hand steering when you turn at low speeds, park, or need to recover from a skid. Start with your hands at 8 and 4 o'clock, reach across the steering wheel to grasp the opposite side, let go with your other hand, then reach across and pull up.",
              },
            },
            {
              type: ContentBlockType.CALLOUT,
              orderNumber: 7,
              content: {
                title: "One-Hand Steering",
                text: "Steering with one hand is only allowed when turning while backing up (hand at 12 o'clock) or when operating vehicle controls that require removing a hand from the wheel.",
                variant: "info",
              },
            },
          ],
          questions: [
            {
              question:
                "When should you use hand-over-hand steering?",
              explanation:
                "The handbook says to use this method when turning at low speeds, parking, or recovering from a skid.",
              category: "driving-basics",
              questionType: QuestionType.MULTIPLE_CHOICE,
              orderNumber: 1,
              answers: [
                {
                  answerText:
                    "When turning at low speeds, parking, or recovering from a skid",
                  isCorrect: true,
                  orderNumber: 1,
                },
                {
                  answerText: "Only on freeways at high speed",
                  isCorrect: false,
                  orderNumber: 2,
                },
                {
                  answerText: "Whenever making any turn",
                  isCorrect: false,
                  orderNumber: 3,
                },
                {
                  answerText: "Only when parking on a hill",
                  isCorrect: false,
                  orderNumber: 4,
                },
              ],
            },
            {
              question:
                "For hand-to-hand steering, you should not cross your hands over the middle of the steering wheel.",
              explanation:
                "The handbook instructs not to cross hands over the middle of the steering wheel when using hand-to-hand steering.",
              category: "driving-basics",
              questionType: QuestionType.TRUE_FALSE,
              orderNumber: 2,
              answers: [
                { answerText: "True", isCorrect: true, orderNumber: 1 },
                { answerText: "False", isCorrect: false, orderNumber: 2 },
              ],
            },
            {
              question:
                "When backing up while turning, where should you place your hand on the steering wheel?",
              explanation:
                "One-hand steering while backing up requires placing your hand at the 12 o'clock position.",
              category: "driving-basics",
              questionType: QuestionType.MULTIPLE_CHOICE,
              orderNumber: 3,
              answers: [
                {
                  answerText: "12 o'clock position",
                  isCorrect: true,
                  orderNumber: 1,
                },
                {
                  answerText: "6 o'clock position",
                  isCorrect: false,
                  orderNumber: 2,
                },
                {
                  answerText: "3 o'clock position",
                  isCorrect: false,
                  orderNumber: 3,
                },
                {
                  answerText: "Both hands at 9 and 3",
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
      title: "Communicating on the Road",
      description:
        "Signaling rules, horn use, headlights, and emergency flashers.",
      orderNumber: 2,
      lessons: [
        {
          title: "Signaling and Using Your Horn",
          description:
            "When and how to signal, and proper horn use.",
          estimatedDuration: 12,
          orderNumber: 1,
          blocks: [
            {
              type: ContentBlockType.HEADING,
              orderNumber: 1,
              content: { text: "Signaling", level: 1 },
            },
            {
              type: ContentBlockType.PARAGRAPH,
              orderNumber: 2,
              content: {
                text: "Always signal when you turn, change lanes, slow down, or stop. You can signal using your vehicle's signal lights or using hand-and-arm positions.",
              },
            },
            {
              type: ContentBlockType.CHECKLIST,
              orderNumber: 3,
              content: {
                title: "When You Should Signal",
                items: [
                  "At least 100 feet before you turn.",
                  "Before every lane change.",
                  "At least five seconds before you change lanes on a freeway.",
                  "Before pulling next to the curb or away from the curb.",
                  "Even when you do not see other vehicles around you.",
                ],
              },
            },
            {
              type: ContentBlockType.CALLOUT,
              orderNumber: 4,
              content: {
                title: "Remember",
                text: "Turn off your signal when you no longer need it.",
                variant: "tip",
              },
            },
            {
              type: ContentBlockType.HEADING,
              orderNumber: 5,
              content: { text: "Using Your Horn", level: 2 },
            },
            {
              type: ContentBlockType.PARAGRAPH,
              orderNumber: 6,
              content: {
                text: "Use your vehicle's horn to let other drivers know you are there or warn others of a hazard. Use your horn to avoid collisions and to alert oncoming traffic on narrow mountain roads where you cannot see at least 200 feet ahead.",
              },
            },
            {
              type: ContentBlockType.QUOTE,
              orderNumber: 7,
              content: {
                text: "At least five seconds before you change lanes on a freeway.",
                attribution: "California Driver's Handbook, Section 5",
              },
            },
          ],
          questions: [
            {
              question:
                "How far before a turn should you signal?",
              explanation:
                "The handbook states you should signal at least 100 feet before you turn.",
              category: "driving-basics",
              questionType: QuestionType.MULTIPLE_CHOICE,
              orderNumber: 1,
              answers: [
                {
                  answerText: "At least 100 feet",
                  isCorrect: true,
                  orderNumber: 1,
                },
                {
                  answerText: "At least 50 feet",
                  isCorrect: false,
                  orderNumber: 2,
                },
                {
                  answerText: "At least 200 feet",
                  isCorrect: false,
                  orderNumber: 3,
                },
                {
                  answerText: "Only at the intersection",
                  isCorrect: false,
                  orderNumber: 4,
                },
              ],
            },
            {
              question:
                "How long before changing lanes on a freeway should you signal?",
              explanation:
                "The handbook requires signaling at least five seconds before changing lanes on a freeway.",
              category: "driving-basics",
              questionType: QuestionType.MULTIPLE_CHOICE,
              orderNumber: 2,
              answers: [
                {
                  answerText: "At least five seconds",
                  isCorrect: true,
                  orderNumber: 1,
                },
                {
                  answerText: "At least one second",
                  isCorrect: false,
                  orderNumber: 2,
                },
                {
                  answerText: "At least ten seconds",
                  isCorrect: false,
                  orderNumber: 3,
                },
                {
                  answerText: "Signaling is not required on freeways",
                  isCorrect: false,
                  orderNumber: 4,
                },
              ],
            },
            {
              question:
                "You should signal even when you do not see other vehicles around you.",
              explanation:
                "Section 5 lists signaling even when no other vehicles are visible.",
              category: "driving-basics",
              questionType: QuestionType.TRUE_FALSE,
              orderNumber: 3,
              answers: [
                { answerText: "True", isCorrect: true, orderNumber: 1 },
                { answerText: "False", isCorrect: false, orderNumber: 2 },
              ],
            },
            {
              question:
                "On narrow mountain roads, use your horn when you cannot see at least how far ahead?",
              explanation:
                "The handbook says to alert oncoming traffic on narrow mountain roads where you cannot see at least 200 feet ahead.",
              category: "driving-basics",
              questionType: QuestionType.MULTIPLE_CHOICE,
              orderNumber: 4,
              answers: [
                {
                  answerText: "200 feet",
                  isCorrect: true,
                  orderNumber: 1,
                },
                {
                  answerText: "100 feet",
                  isCorrect: false,
                  orderNumber: 2,
                },
                {
                  answerText: "500 feet",
                  isCorrect: false,
                  orderNumber: 3,
                },
                {
                  answerText: "50 feet",
                  isCorrect: false,
                  orderNumber: 4,
                },
              ],
            },
          ],
        },
        {
          title: "Headlights and Emergency Flashers",
          description:
            "When to use headlights and how to warn others of hazards ahead.",
          estimatedDuration: 12,
          orderNumber: 2,
          blocks: [
            {
              type: ContentBlockType.HEADING,
              orderNumber: 1,
              content: { text: "Using Your Headlights", level: 1 },
            },
            {
              type: ContentBlockType.PARAGRAPH,
              orderNumber: 2,
              content: {
                text: "Dim your high-beam headlights to low beams within 500 feet of a vehicle coming toward you or within 300 feet of a vehicle you are following. It is illegal to drive using only parking lights.",
              },
            },
            {
              type: ContentBlockType.CHECKLIST,
              orderNumber: 3,
              content: {
                title: "When to Use Your Headlights",
                items: [
                  "When it is too dark to see from 1,000 feet away.",
                  "Beginning 30 minutes after sunset until 30 minutes before sunrise.",
                  "When using windshield wipers due to fog, rain, or snow.",
                  "On mountain roads and tunnels, even on sunny days.",
                  "When a road sign states that headlights must be on.",
                ],
              },
            },
            {
              type: ContentBlockType.HEADING,
              orderNumber: 4,
              content: { text: "Using Your Emergency Flashers", level: 2 },
            },
            {
              type: ContentBlockType.PARAGRAPH,
              orderNumber: 5,
              content: {
                text: "If you can see a collision or hazard ahead, warn drivers behind you by turning on your emergency flashers, lightly tapping your brake pedal three or four times, or using a hand signal when slowing and stopping.",
              },
            },
            {
              type: ContentBlockType.CALLOUT,
              orderNumber: 6,
              content: {
                title: "Vehicle Trouble",
                text: "If your vehicle does not have emergency flashers, use your turn signals. Do not stop just over a hill or just around a curve where other drivers may not see your vehicle in time.",
                variant: "warning",
              },
            },
            {
              type: ContentBlockType.PARAGRAPH,
              orderNumber: 7,
              content: {
                text: "If possible, pull off the road away from all traffic. If you cannot get completely off the road, stop where people can see you and your vehicle from behind.",
              },
            },
          ],
          questions: [
            {
              question:
                "Within how many feet must you dim high beams for an oncoming vehicle?",
              explanation:
                "The handbook requires dimming high beams within 500 feet of an oncoming vehicle.",
              category: "driving-basics",
              questionType: QuestionType.MULTIPLE_CHOICE,
              orderNumber: 1,
              answers: [
                { answerText: "500 feet", isCorrect: true, orderNumber: 1 },
                { answerText: "300 feet", isCorrect: false, orderNumber: 2 },
                { answerText: "200 feet", isCorrect: false, orderNumber: 3 },
                { answerText: "1,000 feet", isCorrect: false, orderNumber: 4 },
              ],
            },
            {
              question:
                "If you use your windshield wipers due to rain, you must turn on your low-beam headlights.",
              explanation:
                "Section 5 requires low-beam headlights when windshield wipers are needed due to fog, rain, or snow.",
              category: "driving-basics",
              questionType: QuestionType.TRUE_FALSE,
              orderNumber: 2,
              answers: [
                { answerText: "True", isCorrect: true, orderNumber: 1 },
                { answerText: "False", isCorrect: false, orderNumber: 2 },
              ],
            },
            {
              question:
                "It is legal to drive using only parking lights.",
              explanation:
                "The handbook states it is illegal to drive using only parking lights.",
              category: "driving-basics",
              questionType: QuestionType.TRUE_FALSE,
              orderNumber: 3,
              answers: [
                { answerText: "True", isCorrect: false, orderNumber: 1 },
                { answerText: "False", isCorrect: true, orderNumber: 2 },
              ],
            },
            {
              question:
                "When must you begin using headlights based on time of day?",
              explanation:
                "Headlights must be used beginning 30 minutes after sunset until 30 minutes before sunrise.",
              category: "driving-basics",
              questionType: QuestionType.MULTIPLE_CHOICE,
              orderNumber: 4,
              answers: [
                {
                  answerText:
                    "30 minutes after sunset until 30 minutes before sunrise",
                  isCorrect: true,
                  orderNumber: 1,
                },
                {
                  answerText: "At sunset until sunrise",
                  isCorrect: false,
                  orderNumber: 2,
                },
                {
                  answerText: "One hour after sunset",
                  isCorrect: false,
                  orderNumber: 3,
                },
                {
                  answerText: "Only after midnight",
                  isCorrect: false,
                  orderNumber: 4,
                },
              ],
            },
            {
              question:
                "Within how many feet must you dim high beams when following another vehicle?",
              explanation:
                "The handbook requires dimming within 300 feet of a vehicle you are following.",
              category: "driving-basics",
              questionType: QuestionType.MULTIPLE_CHOICE,
              orderNumber: 5,
              answers: [
                { answerText: "300 feet", isCorrect: true, orderNumber: 1 },
                { answerText: "500 feet", isCorrect: false, orderNumber: 2 },
                { answerText: "200 feet", isCorrect: false, orderNumber: 3 },
                { answerText: "100 feet", isCorrect: false, orderNumber: 4 },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export const unit06: UnitSeed = {
  title: "Navigating the Roads",
  description:
    "Lane markings, choosing and changing lanes, turns, merging, passing, and parking.",
  orderNumber: 6,
  chapters: [
    {
      title: "Lane Markings and Lane Changes",
      description:
        "Understanding lane markings and safely choosing and changing lanes.",
      orderNumber: 1,
      lessons: [
        {
          title: "Understanding Lane Markings",
          description:
            "Yellow lines, white lines, double lines, and yield lines.",
          estimatedDuration: 15,
          orderNumber: 1,
          blocks: [
            {
              type: ContentBlockType.HEADING,
              orderNumber: 1,
              content: { text: "Lane Markings", level: 1 },
            },
            {
              type: ContentBlockType.PARAGRAPH,
              orderNumber: 2,
              content: {
                text: "Lane markings on road surfaces help drivers know which part of the road to use and understand traffic rules.",
              },
            },
            {
              type: ContentBlockType.HEADING,
              orderNumber: 3,
              content: { text: "Yellow Lines", level: 2 },
            },
            {
              type: ContentBlockType.PARAGRAPH,
              orderNumber: 4,
              content: {
                text: "A single solid yellow line marks the center of a road with two-way traffic. Do not pass if there is only one lane going your direction and a solid yellow line on your side. Double solid yellow lines must not be crossed except for HOV entrances, construction directions, or turning left across a single set to enter or exit a driveway, private road, or make a U-turn.",
              },
            },
            {
              type: ContentBlockType.CALLOUT,
              orderNumber: 5,
              content: {
                title: "Broken Yellow Line",
                text: "A broken yellow line indicates you may pass if the broken line is next to your driving lane. Only pass when it is safe.",
                variant: "info",
              },
            },
            {
              type: ContentBlockType.HEADING,
              orderNumber: 6,
              content: { text: "White Lines and Yield Lines", level: 2 },
            },
            {
              type: ContentBlockType.PARAGRAPH,
              orderNumber: 7,
              content: {
                text: "A single solid white line marks traffic lanes going in the same direction. Double solid white lines indicate a lane barrier — never change lanes over double solid white lines. A yield line is a solid white line of triangles that shows approaching vehicles where to yield or stop.",
              },
            },
            {
              type: ContentBlockType.QUOTE,
              orderNumber: 8,
              content: {
                text: "Two sets of solid double yellow lines spaced two or more feet apart are considered a barrier.",
                attribution: "California Driver's Handbook, Section 6",
              },
            },
          ],
          questions: [
            {
              question:
                "What does a broken yellow line next to your lane indicate?",
              explanation:
                "A broken yellow line indicates you may pass if the broken line is next to your driving lane, when safe.",
              category: "navigating",
              questionType: QuestionType.MULTIPLE_CHOICE,
              orderNumber: 1,
              answers: [
                {
                  answerText: "You may pass when it is safe",
                  isCorrect: true,
                  orderNumber: 1,
                },
                {
                  answerText: "No passing is ever allowed",
                  isCorrect: false,
                  orderNumber: 2,
                },
                {
                  answerText: "The lane is for carpools only",
                  isCorrect: false,
                  orderNumber: 3,
                },
                {
                  answerText: "You must stop immediately",
                  isCorrect: false,
                  orderNumber: 4,
                },
              ],
            },
            {
              question:
                "You may change lanes over double solid white lines if traffic is light.",
              explanation:
                "The handbook states never change lanes over double solid white lines.",
              category: "navigating",
              questionType: QuestionType.TRUE_FALSE,
              orderNumber: 2,
              answers: [
                { answerText: "True", isCorrect: false, orderNumber: 1 },
                { answerText: "False", isCorrect: true, orderNumber: 2 },
              ],
            },
            {
              question:
                "What does a yield line look like?",
              explanation:
                "A yield line is a solid white line of triangles pointing toward approaching vehicles.",
              category: "navigating",
              questionType: QuestionType.MULTIPLE_CHOICE,
              orderNumber: 3,
              answers: [
                {
                  answerText:
                    "A solid white line of triangles pointing toward approaching vehicles",
                  isCorrect: true,
                  orderNumber: 1,
                },
                {
                  answerText: "A double yellow dashed line",
                  isCorrect: false,
                  orderNumber: 2,
                },
                {
                  answerText: "A solid red line at intersections",
                  isCorrect: false,
                  orderNumber: 3,
                },
                {
                  answerText: "A green painted curb",
                  isCorrect: false,
                  orderNumber: 4,
                },
              ],
            },
            {
              question:
                "Two sets of solid double yellow lines spaced two or more feet apart are considered a barrier.",
              explanation:
                "Section 6 states two sets of solid double yellow lines spaced two or more feet apart are considered a barrier.",
              category: "navigating",
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
          title: "Choosing and Changing Lanes",
          description:
            "Lane numbering, lane selection tips, and safe lane change procedures.",
          estimatedDuration: 12,
          orderNumber: 2,
          blocks: [
            {
              type: ContentBlockType.HEADING,
              orderNumber: 1,
              content: { text: "Choosing a Lane", level: 1 },
            },
            {
              type: ContentBlockType.PARAGRAPH,
              orderNumber: 2,
              content: {
                text: "Traffic lanes are often referred to by number. The left (or fast) lane is called the Number 1 Lane. The lane to the right of the Number 1 Lane is called the Number 2 Lane, then the Number 3 Lane, etc.",
              },
            },
            {
              type: ContentBlockType.CHECKLIST,
              orderNumber: 3,
              content: {
                title: "Tips for Choosing a Lane",
                items: [
                  "Use the left lane to pass or turn left.",
                  "Use the right lane to enter or exit traffic or when entering from a curb or shoulder.",
                ],
              },
            },
            {
              type: ContentBlockType.HEADING,
              orderNumber: 4,
              content: { text: "Changing Lanes", level: 2 },
            },
            {
              type: ContentBlockType.CHECKLIST,
              orderNumber: 5,
              content: {
                title: "Before You Change Lanes",
                items: [
                  "Signal.",
                  "Check your mirrors.",
                  "Check traffic behind and beside you.",
                  "Look over your shoulder in the direction you plan to move.",
                  "Check your blind spots for other vehicles, motorcyclists, and bicyclists.",
                  "Be sure there is enough space in the next lane.",
                ],
              },
            },
            {
              type: ContentBlockType.CALLOUT,
              orderNumber: 6,
              content: {
                title: "Stay in Your Lane",
                text: "Stay in one lane as much as possible. Do not weave in and out of traffic. Last minute lane or direction changes may increase the risk of collisions.",
                variant: "warning",
              },
            },
            {
              type: ContentBlockType.PARAGRAPH,
              orderNumber: 7,
              content: {
                text: "It is not necessary to slow down before a lane change. Once you start moving through an intersection, keep going. If you miss a turn, keep driving until you can safely and legally turn around.",
              },
            },
          ],
          questions: [
            {
              question:
                "Which lane is called the Number 1 Lane?",
              explanation:
                "The left (or fast) lane is called the Number 1 Lane.",
              category: "navigating",
              questionType: QuestionType.MULTIPLE_CHOICE,
              orderNumber: 1,
              answers: [
                {
                  answerText: "The left (or fast) lane",
                  isCorrect: true,
                  orderNumber: 1,
                },
                {
                  answerText: "The right lane",
                  isCorrect: false,
                  orderNumber: 2,
                },
                {
                  answerText: "The center turn lane",
                  isCorrect: false,
                  orderNumber: 3,
                },
                {
                  answerText: "The shoulder",
                  isCorrect: false,
                  orderNumber: 4,
                },
              ],
            },
            {
              question:
                "You must slow down before every lane change.",
              explanation:
                "The handbook states it is not necessary to slow down before a lane change.",
              category: "navigating",
              questionType: QuestionType.TRUE_FALSE,
              orderNumber: 2,
              answers: [
                { answerText: "True", isCorrect: false, orderNumber: 1 },
                { answerText: "False", isCorrect: true, orderNumber: 2 },
              ],
            },
            {
              question:
                "What should you do if you miss your turn?",
              explanation:
                "The handbook says keep driving until you can safely and legally turn around.",
              category: "navigating",
              questionType: QuestionType.MULTIPLE_CHOICE,
              orderNumber: 3,
              answers: [
                {
                  answerText:
                    "Keep driving until you can safely and legally turn around",
                  isCorrect: true,
                  orderNumber: 1,
                },
                {
                  answerText: "Stop and back up immediately",
                  isCorrect: false,
                  orderNumber: 2,
                },
                {
                  answerText: "Make a quick U-turn anywhere",
                  isCorrect: false,
                  orderNumber: 3,
                },
                {
                  answerText: "Change lanes without signaling",
                  isCorrect: false,
                  orderNumber: 4,
                },
              ],
            },
            {
              question:
                "Before changing lanes, you should look over your shoulder in the direction you plan to move.",
              explanation:
                "Section 6 requires looking over your shoulder to make sure the lane is clear.",
              category: "navigating",
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
      title: "Turns, Merging, and Parking",
      description:
        "Making turns and U-turns, merging and exiting, passing rules, and parking.",
      orderNumber: 2,
      lessons: [
        {
          title: "Making Turns and U-Turns",
          description:
            "Right turns, left turns, and U-turn rules.",
          estimatedDuration: 18,
          orderNumber: 1,
          blocks: [
            {
              type: ContentBlockType.HEADING,
              orderNumber: 1,
              content: { text: "Right Turns", level: 1 },
            },
            {
              type: ContentBlockType.PARAGRAPH,
              orderNumber: 2,
              content: {
                text: "To make a right turn, drive close to the right edge of the road, start signaling about 100 feet before the turn, stop behind the limit line, look both ways (left-right-left), and complete your turn in the right lane without turning wide.",
              },
            },
            {
              type: ContentBlockType.CALLOUT,
              orderNumber: 3,
              content: {
                title: "Right Turn at Red Light",
                text: "You may turn right at a red light after a complete stop unless there is a No Turn on Red sign. You may not turn right if stopped at a red arrow — wait until the light changes to green.",
                variant: "info",
              },
            },
            {
              type: ContentBlockType.HEADING,
              orderNumber: 4,
              content: { text: "Left Turns", level: 2 },
            },
            {
              type: ContentBlockType.PARAGRAPH,
              orderNumber: 5,
              content: {
                text: "Drive close to the center divider or into the left turn lane, start signaling 100 feet before the turn, and keep your wheels pointed straight ahead until it is safe to start your turn. If your wheels are pointed left and a vehicle hits you from behind, you could be pushed into oncoming traffic.",
              },
            },
            {
              type: ContentBlockType.HEADING,
              orderNumber: 6,
              content: { text: "U-Turns", level: 2 },
            },
            {
              type: ContentBlockType.CHECKLIST,
              orderNumber: 7,
              content: {
                title: "You May Make a U-Turn",
                items: [
                  "Across a double yellow line.",
                  "In a residential district if no vehicles are approaching within 200 feet.",
                  "At an intersection on a green light or green arrow, unless a No U-turn sign is posted.",
                  "On a divided highway if a center divider opening is provided.",
                ],
              },
            },
            {
              type: ContentBlockType.CALLOUT,
              orderNumber: 8,
              content: {
                title: "Never Make a U-Turn",
                text: "Never make a U-turn at or on a railroad crossing, on a one-way street, in front of a fire station, in business districts, or when you cannot see clearly for 200 feet in each direction.",
                variant: "warning",
              },
            },
          ],
          questions: [
            {
              question:
                "When making a left turn, when should you point your wheels left?",
              explanation:
                "Keep wheels pointed straight ahead until it is safe to start your turn to avoid being pushed into oncoming traffic.",
              category: "navigating",
              questionType: QuestionType.MULTIPLE_CHOICE,
              orderNumber: 1,
              answers: [
                {
                  answerText: "When it is safe to start the turn",
                  isCorrect: true,
                  orderNumber: 1,
                },
                {
                  answerText: "As soon as you enter the intersection",
                  isCorrect: false,
                  orderNumber: 2,
                },
                {
                  answerText: "100 feet before the turn",
                  isCorrect: false,
                  orderNumber: 3,
                },
                {
                  answerText: "While waiting at the limit line",
                  isCorrect: false,
                  orderNumber: 4,
                },
              ],
            },
            {
              question:
                "You may turn right at a red arrow after stopping.",
              explanation:
                "The handbook states you may not turn right if stopped at a red arrow light.",
              category: "navigating",
              questionType: QuestionType.TRUE_FALSE,
              orderNumber: 2,
              answers: [
                { answerText: "True", isCorrect: false, orderNumber: 1 },
                { answerText: "False", isCorrect: true, orderNumber: 2 },
              ],
            },
            {
              question:
                "In a residential district, you may make a U-turn if no vehicles are approaching within what distance?",
              explanation:
                "A U-turn is allowed in a residential district if no vehicles are approaching within 200 feet.",
              category: "navigating",
              questionType: QuestionType.MULTIPLE_CHOICE,
              orderNumber: 3,
              answers: [
                { answerText: "200 feet", isCorrect: true, orderNumber: 1 },
                { answerText: "100 feet", isCorrect: false, orderNumber: 2 },
                { answerText: "500 feet", isCorrect: false, orderNumber: 3 },
                { answerText: "50 feet", isCorrect: false, orderNumber: 4 },
              ],
            },
            {
              question:
                "You may make a U-turn across a double yellow line.",
              explanation:
                "Section 6 lists making a U-turn across a double yellow line as permitted.",
              category: "navigating",
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
          title: "Merging, Passing, and Parking",
          description:
            "Highway merging and exiting, passing rules, and parallel, hill, and colored curb parking.",
          estimatedDuration: 20,
          orderNumber: 2,
          blocks: [
            {
              type: ContentBlockType.HEADING,
              orderNumber: 1,
              content: { text: "Merging and Exiting", level: 1 },
            },
            {
              type: ContentBlockType.PARAGRAPH,
              orderNumber: 2,
              content: {
                text: "Highway traffic has the right-of-way. When entering a highway, be at or near the speed of traffic and merge when safe — do not stop unless absolutely necessary. When exiting, signal five seconds (approximately 400 feet) before you exit.",
              },
            },
            {
              type: ContentBlockType.HEADING,
              orderNumber: 3,
              content: { text: "Passing", level: 2 },
            },
            {
              type: ContentBlockType.PARAGRAPH,
              orderNumber: 4,
              content: {
                text: "Do not pass within 100 feet of an intersection, bridge, tunnel, railroad crossing, or other hazardous area. You may pass on the right only when an open highway has two or more lanes going in your direction, the driver ahead is turning left and you can safely pass on the right, or you are on a one-way street.",
              },
            },
            {
              type: ContentBlockType.HEADING,
              orderNumber: 5,
              content: { text: "Parallel and Hill Parking", level: 2 },
            },
            {
              type: ContentBlockType.PARAGRAPH,
              orderNumber: 6,
              content: {
                text: "When parallel parking, your vehicle should end up parallel and within 18 inches of the curb. When parking on a hill headed downhill, turn front wheels into the curb. Headed uphill, turn wheels away from the curb and let the vehicle roll back until the wheel gently touches the curb.",
              },
            },
            {
              type: ContentBlockType.CHECKLIST,
              orderNumber: 7,
              content: {
                title: "Colored Curb Rules",
                items: [
                  "White: Stop only long enough to pick up or drop off passengers.",
                  "Green: Park for a limited time as posted.",
                  "Yellow: Load and unload passengers and freight.",
                  "Red: No stopping, standing, or parking.",
                  "Blue: Parking for disabled persons with a valid placard or plate.",
                ],
              },
            },
            {
              type: ContentBlockType.QUOTE,
              orderNumber: 8,
              content: {
                text: "Never drive off the paved or main-traveled part of the road to pass.",
                attribution: "California Driver's Handbook, Section 6",
              },
            },
          ],
          questions: [
            {
              question:
                "How far before exiting a highway should you signal?",
              explanation:
                "The handbook says to signal five seconds (approximately 400 feet) before you exit.",
              category: "navigating",
              questionType: QuestionType.MULTIPLE_CHOICE,
              orderNumber: 1,
              answers: [
                {
                  answerText: "Five seconds (approximately 400 feet)",
                  isCorrect: true,
                  orderNumber: 1,
                },
                {
                  answerText: "One second (approximately 50 feet)",
                  isCorrect: false,
                  orderNumber: 2,
                },
                {
                  answerText: "Ten seconds (approximately 800 feet)",
                  isCorrect: false,
                  orderNumber: 3,
                },
                {
                  answerText: "No signal is required when exiting",
                  isCorrect: false,
                  orderNumber: 4,
                },
              ],
            },
            {
              question:
                "When parallel parking, how close to the curb should your vehicle be?",
              explanation:
                "Your vehicle should be parallel and within 18 inches of the curb.",
              category: "navigating",
              questionType: QuestionType.MULTIPLE_CHOICE,
              orderNumber: 2,
              answers: [
                {
                  answerText: "Within 18 inches",
                  isCorrect: true,
                  orderNumber: 1,
                },
                {
                  answerText: "Within 36 inches",
                  isCorrect: false,
                  orderNumber: 2,
                },
                {
                  answerText: "Within 6 inches",
                  isCorrect: false,
                  orderNumber: 3,
                },
                {
                  answerText: "Any distance is acceptable",
                  isCorrect: false,
                  orderNumber: 4,
                },
              ],
            },
            {
              question:
                "When parking headed downhill, turn your front wheels into the curb.",
              explanation:
                "Section 6 states headed downhill: turn your front wheels into the curb or right toward the side of the road.",
              category: "navigating",
              questionType: QuestionType.TRUE_FALSE,
              orderNumber: 3,
              answers: [
                { answerText: "True", isCorrect: true, orderNumber: 1 },
                { answerText: "False", isCorrect: false, orderNumber: 2 },
              ],
            },
            {
              question:
                "What does a red curb indicate?",
              explanation:
                "Red curbs mean no stopping, standing, or parking.",
              category: "navigating",
              questionType: QuestionType.MULTIPLE_CHOICE,
              orderNumber: 4,
              answers: [
                {
                  answerText: "No stopping, standing, or parking",
                  isCorrect: true,
                  orderNumber: 1,
                },
                {
                  answerText: "Limited-time parking",
                  isCorrect: false,
                  orderNumber: 2,
                },
                {
                  answerText: "Passenger loading only",
                  isCorrect: false,
                  orderNumber: 3,
                },
                {
                  answerText: "Disabled parking only",
                  isCorrect: false,
                  orderNumber: 4,
                },
              ],
            },
            {
              question:
                "You may pass within 100 feet of a railroad crossing if no train is visible.",
              explanation:
                "Do not pass within 100 feet of a railroad crossing or other hazardous area.",
              category: "navigating",
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
