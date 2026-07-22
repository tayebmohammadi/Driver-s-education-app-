import { ContentBlockType, QuestionType } from "@prisma/client";
import type { UnitSeed } from "../types";

export const unit08: UnitSeed = {
  title: "Safe Driving",
  description:
    "Learn to scan your surroundings, manage blind spots, handle adverse conditions, use safety restraints, obey speed laws, respond to emergencies, and avoid distractions.",
  orderNumber: 8,
  chapters: [
    {
      title: "Be Aware of Your Surroundings",
      description:
        "Scanning the road, maintaining safe following distance, and checking blind spots.",
      orderNumber: 1,
      lessons: [
        {
          title: "Scanning, Tailgating, and the Three-Second Rule",
          description:
            "Keep your eyes moving, scan ahead, and maintain a safe following distance.",
          estimatedDuration: 12,
          orderNumber: 1,
          blocks: [
            {
              type: ContentBlockType.HEADING,
              orderNumber: 1,
              content: { text: "Be Aware of Your Surroundings", level: 1 },
            },
            {
              type: ContentBlockType.PARAGRAPH,
              orderNumber: 2,
              content: {
                text: "To drive safely, you need to know what is around you. This helps you make good decisions and react to hazards on the road. Areas ahead of you, next to you, in your blind spots, and behind you all require your attention.",
              },
            },
            {
              type: ContentBlockType.HEADING,
              orderNumber: 3,
              content: { text: "Scan Your Surroundings", level: 2 },
            },
            {
              type: ContentBlockType.PARAGRAPH,
              orderNumber: 4,
              content: {
                text: "To give yourself time to react, avoid last minute moves and hazards, always keep your eyes moving and scan the road at least 10 seconds ahead of your vehicle.",
              },
            },
            {
              type: ContentBlockType.HEADING,
              orderNumber: 5,
              content: { text: "Tailgating (Following Too Closely)", level: 2 },
            },
            {
              type: ContentBlockType.PARAGRAPH,
              orderNumber: 6,
              content: {
                text: "Tailgating makes it harder for you to see the road ahead because the vehicle in front of you blocks your view. You will not have enough time to react if the driver in front of you brakes suddenly.",
              },
            },
            {
              type: ContentBlockType.CALLOUT,
              orderNumber: 7,
              content: {
                title: "Three-Second Rule",
                text: "Use the three-second rule to ensure a safe following distance and avoid a collision. Following other vehicles at a safe distance gives you enough time to react if another driver makes a mistake.",
                variant: "info",
              },
            },
            {
              type: ContentBlockType.PARAGRAPH,
              orderNumber: 8,
              content: {
                text: "If a vehicle merges in front of you too closely, take your foot off the accelerator to create space. Create more space when a tailgater is behind you or when following motorcyclists on metal surfaces and gravel.",
              },
            },
            {
              type: ContentBlockType.HEADING,
              orderNumber: 9,
              content: { text: "Know What Is at Your Side", level: 2 },
            },
            {
              type: ContentBlockType.CHECKLIST,
              orderNumber: 10,
              content: {
                title: "Side Awareness Tips",
                items: [
                  "Do not stay in another driver's blind spot.",
                  "Avoid driving directly alongside other vehicles.",
                  "Make space for vehicles entering freeways.",
                  "Keep space between your vehicle and parked vehicles.",
                  "Look both ways, even at intersections where traffic has a red light or stop sign.",
                ],
              },
            },
          ],
          questions: [
            {
              question:
                "How far ahead should you scan the road while driving?",
              explanation:
                "The handbook states you should scan the road at least 10 seconds ahead of your vehicle.",
              category: "safe-driving",
              questionType: QuestionType.MULTIPLE_CHOICE,
              orderNumber: 1,
              answers: [
                {
                  answerText: "At least 10 seconds ahead",
                  isCorrect: true,
                  orderNumber: 1,
                },
                {
                  answerText: "At least 3 seconds ahead",
                  isCorrect: false,
                  orderNumber: 2,
                },
                {
                  answerText: "At least 5 seconds ahead",
                  isCorrect: false,
                  orderNumber: 3,
                },
                {
                  answerText: "Only as far as you can see in your mirrors",
                  isCorrect: false,
                  orderNumber: 4,
                },
              ],
            },
            {
              question:
                "What rule helps you maintain a safe following distance?",
              explanation:
                "The three-second rule ensures a safe following distance and helps you avoid a collision.",
              category: "safe-driving",
              questionType: QuestionType.MULTIPLE_CHOICE,
              orderNumber: 2,
              answers: [
                {
                  answerText: "The three-second rule",
                  isCorrect: true,
                  orderNumber: 1,
                },
                {
                  answerText: "The one-second rule",
                  isCorrect: false,
                  orderNumber: 2,
                },
                {
                  answerText: "The five-car-length rule",
                  isCorrect: false,
                  orderNumber: 3,
                },
                {
                  answerText: "The two-second rule",
                  isCorrect: false,
                  orderNumber: 4,
                },
              ],
            },
            {
              question:
                "Tailgating makes it harder to see the road ahead.",
              explanation:
                "The handbook states tailgating blocks your view of the road ahead.",
              category: "safe-driving",
              questionType: QuestionType.TRUE_FALSE,
              orderNumber: 3,
              answers: [
                { answerText: "True", isCorrect: true, orderNumber: 1 },
                { answerText: "False", isCorrect: false, orderNumber: 2 },
              ],
            },
            {
              question:
                "If a vehicle merges too closely in front of you, you should:",
              explanation:
                "Taking your foot off the accelerator creates space between you and the vehicle ahead.",
              category: "safe-driving",
              questionType: QuestionType.MULTIPLE_CHOICE,
              orderNumber: 4,
              answers: [
                {
                  answerText: "Take your foot off the accelerator",
                  isCorrect: true,
                  orderNumber: 1,
                },
                {
                  answerText: "Brake hard immediately",
                  isCorrect: false,
                  orderNumber: 2,
                },
                {
                  answerText: "Honk and maintain your speed",
                  isCorrect: false,
                  orderNumber: 3,
                },
                {
                  answerText: "Flash your high beams",
                  isCorrect: false,
                  orderNumber: 4,
                },
              ],
            },
          ],
        },
        {
          title: "Blind Spots and Checking Your Surroundings",
          description:
            "Identify blind spots and know when to check areas you cannot see in mirrors.",
          estimatedDuration: 10,
          orderNumber: 2,
          blocks: [
            {
              type: ContentBlockType.HEADING,
              orderNumber: 1,
              content: { text: "Blind Spots", level: 1 },
            },
            {
              type: ContentBlockType.PARAGRAPH,
              orderNumber: 2,
              content: {
                text: "Every vehicle has blind spots. These are areas around the vehicle that a driver cannot see when looking straight ahead or using the mirrors. For most vehicles, the blind spots are at the sides slightly behind the driver.",
              },
            },
            {
              type: ContentBlockType.PARAGRAPH,
              orderNumber: 3,
              content: {
                text: "To check your blind spots, look over your right and left shoulders out of your side windows. Only turn your head when you look. Do not turn your whole body or steering wheel.",
              },
            },
            {
              type: ContentBlockType.CHECKLIST,
              orderNumber: 4,
              content: {
                title: "Check Blind Spots Before You",
                items: [
                  "Change lanes.",
                  "Turn at an intersection.",
                  "Merge with traffic.",
                  "Back up.",
                  "Leave a parking space.",
                  "Parallel park.",
                  "Pull out from the curb.",
                  "Open your car door.",
                ],
              },
            },
            {
              type: ContentBlockType.HEADING,
              orderNumber: 5,
              content: { text: "Know What Is Behind You", level: 2 },
            },
            {
              type: ContentBlockType.PARAGRAPH,
              orderNumber: 6,
              content: {
                text: "Knowing what is behind you can help you avoid rear-end collisions. Check traffic behind you often by using your rearview mirror, side mirrors, and turning your head when you change lanes, reduce speed, turn, stop, or back up.",
              },
            },
            {
              type: ContentBlockType.CALLOUT,
              orderNumber: 7,
              content: {
                title: "Safety Note",
                text: "You should not stay in another driver's blind spot. Large trucks have large blind spots called No Zones — if you cannot see the truck's side mirrors, the truck driver cannot see you.",
                variant: "warning",
              },
            },
          ],
          questions: [
            {
              question: "Where are blind spots located on most vehicles?",
              explanation:
                "For most vehicles, blind spots are at the sides slightly behind the driver.",
              category: "safe-driving",
              questionType: QuestionType.MULTIPLE_CHOICE,
              orderNumber: 1,
              answers: [
                {
                  answerText:
                    "At the sides slightly behind the driver",
                  isCorrect: true,
                  orderNumber: 1,
                },
                {
                  answerText: "Directly in front of the vehicle",
                  isCorrect: false,
                  orderNumber: 2,
                },
                {
                  answerText: "Only behind the rear bumper",
                  isCorrect: false,
                  orderNumber: 3,
                },
                {
                  answerText: "Inside the vehicle cabin",
                  isCorrect: false,
                  orderNumber: 4,
                },
              ],
            },
            {
              question:
                "When checking blind spots, you should turn your whole body toward the window.",
              explanation:
                "Only turn your head when checking blind spots. Do not turn your whole body or steering wheel.",
              category: "safe-driving",
              questionType: QuestionType.TRUE_FALSE,
              orderNumber: 2,
              answers: [
                { answerText: "True", isCorrect: false, orderNumber: 1 },
                { answerText: "False", isCorrect: true, orderNumber: 2 },
              ],
            },
            {
              question:
                "You should check your blind spots before changing lanes.",
              explanation:
                "The handbook lists changing lanes as one of the times you must check blind spots.",
              category: "safe-driving",
              questionType: QuestionType.TRUE_FALSE,
              orderNumber: 3,
              answers: [
                { answerText: "True", isCorrect: true, orderNumber: 1 },
                { answerText: "False", isCorrect: false, orderNumber: 2 },
              ],
            },
            {
              question:
                "If you cannot see a truck's side mirrors, the truck driver:",
              explanation:
                "If you cannot see the truck's side mirrors, the truck driver cannot see you.",
              category: "safe-driving",
              questionType: QuestionType.MULTIPLE_CHOICE,
              orderNumber: 4,
              answers: [
                {
                  answerText: "Cannot see you",
                  isCorrect: true,
                  orderNumber: 1,
                },
                {
                  answerText: "Can always see you",
                  isCorrect: false,
                  orderNumber: 2,
                },
                {
                  answerText: "Has a better view than you",
                  isCorrect: false,
                  orderNumber: 3,
                },
                {
                  answerText: "Must yield to you",
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
      title: "Conditions, Protection, and Emergencies",
      description:
        "Handle adverse road conditions, use safety restraints, manage speed, respond to emergencies, and avoid distractions.",
      orderNumber: 2,
      lessons: [
        {
          title: "Road Conditions and Managing Speed",
          description:
            "Night driving, sun glare, skids, slippery roads, hydroplaning, and California speed laws.",
          estimatedDuration: 15,
          orderNumber: 1,
          blocks: [
            {
              type: ContentBlockType.HEADING,
              orderNumber: 1,
              content: { text: "Understand the Road Conditions", level: 1 },
            },
            {
              type: ContentBlockType.HEADING,
              orderNumber: 2,
              content: { text: "Darkness and Sun Glare", level: 2 },
            },
            {
              type: ContentBlockType.PARAGRAPH,
              orderNumber: 3,
              content: {
                text: "When driving at night, use your high-beam headlights on open country roads or dark city streets. Make sure you can stop in the distance lit by your headlights. Dim your high-beam headlights to avoid blinding oncoming drivers.",
              },
            },
            {
              type: ContentBlockType.CHECKLIST,
              orderNumber: 4,
              content: {
                title: "Managing Sun Glare",
                items: [
                  "Keep the inside and outside of your windshield clean.",
                  "Wear polarized sunglasses.",
                  "Maintain enough space between your vehicle and others.",
                  "Make sure your car visor works.",
                  "Try to avoid driving during sunrise and sunset.",
                ],
              },
            },
            {
              type: ContentBlockType.HEADING,
              orderNumber: 5,
              content: { text: "Skids and Slippery Roads", level: 2 },
            },
            {
              type: ContentBlockType.PARAGRAPH,
              orderNumber: 6,
              content: {
                text: "A skid is when one or more tires lose traction with the road and the vehicle starts to slip. Rain, snow, or mud can make roads slippery. Adjust your speed: reduce by 5 to 10 mph on wet roads, by half on packed snow, and to no more than 5 mph on ice.",
              },
            },
            {
              type: ContentBlockType.CALLOUT,
              orderNumber: 7,
              content: {
                title: "Hydroplaning",
                text: "Hydroplaning occurs when a vehicle rides on water because tires lose all contact with the road. To avoid hydroplaning, drive slowly, steer around standing water if possible, and do not use the brakes suddenly.",
                variant: "warning",
              },
            },
            {
              type: ContentBlockType.HEADING,
              orderNumber: 8,
              content: { text: "Seat Belts, Child Seats, and Air Bags", level: 2 },
            },
            {
              type: ContentBlockType.PARAGRAPH,
              orderNumber: 9,
              content: {
                text: "You and your passengers must wear seat belts. You can get a ticket if you do not. If your passenger is under 16 years old, you can also get a ticket if they are not wearing their seat belt.",
              },
            },
            {
              type: ContentBlockType.PARAGRAPH,
              orderNumber: 10,
              content: {
                text: "Children under 2 years old, under 40 pounds, and under 3 feet 4 inches tall must be secured in a rear-facing child passenger restraint system. Children under 8 years old or less than 4 feet 9 inches tall must be secured in a child passenger restraint system in a rear seat.",
              },
            },
            {
              type: ContentBlockType.PARAGRAPH,
              orderNumber: 11,
              content: {
                text: "Air bags can help keep you safer than a seat belt alone. Ride at least 10 inches from the airbag cover. A child in a rear-facing child passenger restraint system may not ride in the front seat of an airbag-equipped vehicle.",
              },
            },
            {
              type: ContentBlockType.HEADING,
              orderNumber: 12,
              content: { text: "Manage Your Speed", level: 2 },
            },
            {
              type: ContentBlockType.CALLOUT,
              orderNumber: 13,
              content: {
                title: "Basic Speed Law",
                text: "In California, you may never drive faster than is safe for the current road conditions. Unless otherwise posted, the ideal maximum speed limit on most California highways is 65 mph. It is 55 mph on a two-lane undivided highway and for vehicles towing trailers.",
                variant: "info",
              },
            },
          ],
          questions: [
            {
              question:
                "What is the maximum speed on most California highways unless otherwise posted?",
              explanation:
                "The handbook states the ideal maximum speed limit on most California highways is 65 mph.",
              category: "safe-driving",
              questionType: QuestionType.MULTIPLE_CHOICE,
              orderNumber: 1,
              answers: [
                {
                  answerText: "65 mph",
                  isCorrect: true,
                  orderNumber: 1,
                },
                {
                  answerText: "55 mph",
                  isCorrect: false,
                  orderNumber: 2,
                },
                {
                  answerText: "70 mph",
                  isCorrect: false,
                  orderNumber: 3,
                },
                {
                  answerText: "75 mph",
                  isCorrect: false,
                  orderNumber: 4,
                },
              ],
            },
            {
              question:
                "California's Basic Speed Law means you may never drive faster than is safe for current conditions.",
              explanation:
                "The Basic Speed Law requires you to never drive faster than is safe for the current road conditions.",
              category: "safe-driving",
              questionType: QuestionType.TRUE_FALSE,
              orderNumber: 2,
              answers: [
                { answerText: "True", isCorrect: true, orderNumber: 1 },
                { answerText: "False", isCorrect: false, orderNumber: 2 },
              ],
            },
            {
              question:
                "On a wet road, you should reduce your speed by:",
              explanation:
                "The handbook recommends reducing speed by 5 to 10 mph on wet roads.",
              category: "safe-driving",
              questionType: QuestionType.MULTIPLE_CHOICE,
              orderNumber: 3,
              answers: [
                {
                  answerText: "5 to 10 mph",
                  isCorrect: true,
                  orderNumber: 1,
                },
                {
                  answerText: "20 to 30 mph",
                  isCorrect: false,
                  orderNumber: 2,
                },
                {
                  answerText: "No reduction needed",
                  isCorrect: false,
                  orderNumber: 3,
                },
                {
                  answerText: "Exactly 15 mph",
                  isCorrect: false,
                  orderNumber: 4,
                },
              ],
            },
            {
              question:
                "How far should you sit from an airbag cover?",
              explanation:
                "The handbook recommends riding at least 10 inches from the airbag cover.",
              category: "safe-driving",
              questionType: QuestionType.MULTIPLE_CHOICE,
              orderNumber: 4,
              answers: [
                {
                  answerText: "At least 10 inches",
                  isCorrect: true,
                  orderNumber: 1,
                },
                {
                  answerText: "At least 5 inches",
                  isCorrect: false,
                  orderNumber: 2,
                },
                {
                  answerText: "At least 18 inches",
                  isCorrect: false,
                  orderNumber: 3,
                },
                {
                  answerText: "As close as possible",
                  isCorrect: false,
                  orderNumber: 4,
                },
              ],
            },
            {
              question: "Hydroplaning occurs when:",
              explanation:
                "Hydroplaning is when a vehicle rides on water because tires lose all contact with the road.",
              category: "safe-driving",
              questionType: QuestionType.MULTIPLE_CHOICE,
              orderNumber: 5,
              answers: [
                {
                  answerText:
                    "Tires lose all contact with the road on water",
                  isCorrect: true,
                  orderNumber: 1,
                },
                {
                  answerText: "Brakes lock on dry pavement",
                  isCorrect: false,
                  orderNumber: 2,
                },
                {
                  answerText: "Your engine overheats in rain",
                  isCorrect: false,
                  orderNumber: 3,
                },
                {
                  answerText: "High beams reflect off fog",
                  isCorrect: false,
                  orderNumber: 4,
                },
              ],
            },
          ],
        },
        {
          title: "Emergencies and Avoiding Distractions",
          description:
            "Handle tire blowouts, disabled vehicles on the freeway, and cell phone laws.",
          estimatedDuration: 12,
          orderNumber: 2,
          blocks: [
            {
              type: ContentBlockType.HEADING,
              orderNumber: 1,
              content: { text: "Know How to Handle Emergencies", level: 1 },
            },
            {
              type: ContentBlockType.HEADING,
              orderNumber: 2,
              content: { text: "Tire Blowouts", level: 2 },
            },
            {
              type: ContentBlockType.CHECKLIST,
              orderNumber: 3,
              content: {
                title: "If You Have a Tire Blowout",
                items: [
                  "Hold the steering wheel with both hands.",
                  "Maintain your vehicle speed if possible and safe.",
                  "Gradually release the accelerator.",
                  "Correct the steering to stabilize your vehicle.",
                  "Look and steer in the direction you want to go.",
                  "Once stabilized, slow down and pull off the road safely.",
                ],
              },
            },
            {
              type: ContentBlockType.CALLOUT,
              orderNumber: 4,
              content: {
                title: "Do Not Panic",
                text: "Suddenly braking or abruptly removing your foot from the accelerator during a tire blowout can result in a loss of control.",
                variant: "warning",
              },
            },
            {
              type: ContentBlockType.HEADING,
              orderNumber: 5,
              content: {
                text: "If Your Vehicle Becomes Disabled on the Freeway",
                level: 2,
              },
            },
            {
              type: ContentBlockType.CHECKLIST,
              orderNumber: 6,
              content: {
                title: "Steps to Take",
                items: [
                  "Safely pull over to the right shoulder.",
                  "Exit on the right side, away from traffic.",
                  "Dial 511 from your cell phone or locate a call box.",
                  "Return to your vehicle from the right side.",
                  "Stay inside with your seat belt on until help arrives.",
                  "Use emergency flashers at your discretion.",
                ],
              },
            },
            {
              type: ContentBlockType.HEADING,
              orderNumber: 7,
              content: { text: "Do Not Drive Distracted", level: 2 },
            },
            {
              type: ContentBlockType.PARAGRAPH,
              orderNumber: 8,
              content: {
                text: "Cell phones are the main source of distracted driving. Driving while using a handheld cell phone is unsafe and illegal. Adult drivers should only use a cell phone in hands-free mode when necessary.",
              },
            },
            {
              type: ContentBlockType.CALLOUT,
              orderNumber: 9,
              content: {
                title: "Minors and Cell Phones",
                text: "It is against the law for a minor to use a cell phone or electronic wireless device to answer calls and send or respond to text messages while driving. Exception: minors may use a cell phone to make a call for emergency assistance.",
                variant: "info",
              },
            },
          ],
          questions: [
            {
              question:
                "During a tire blowout, you should suddenly brake hard to stop quickly.",
              explanation:
                "Suddenly braking during a blowout can cause loss of control. Gradually release the accelerator instead.",
              category: "safe-driving",
              questionType: QuestionType.TRUE_FALSE,
              orderNumber: 1,
              answers: [
                { answerText: "True", isCorrect: false, orderNumber: 1 },
                { answerText: "False", isCorrect: true, orderNumber: 2 },
              ],
            },
            {
              question:
                "If your vehicle becomes disabled on the freeway, you should:",
              explanation:
                "The handbook says to stay inside your vehicle with your seat belt on until help arrives.",
              category: "safe-driving",
              questionType: QuestionType.MULTIPLE_CHOICE,
              orderNumber: 2,
              answers: [
                {
                  answerText:
                    "Stay inside with your seat belt on until help arrives",
                  isCorrect: true,
                  orderNumber: 1,
                },
                {
                  answerText: "Stand behind your vehicle in the lane",
                  isCorrect: false,
                  orderNumber: 2,
                },
                {
                  answerText: "Walk along the freeway for help",
                  isCorrect: false,
                  orderNumber: 3,
                },
                {
                  answerText: "Leave the vehicle and wait on the median",
                  isCorrect: false,
                  orderNumber: 4,
                },
              ],
            },
            {
              question:
                "Using a handheld cell phone while driving is:",
              explanation:
                "Driving while using a handheld cell phone is unsafe and illegal.",
              category: "safe-driving",
              questionType: QuestionType.MULTIPLE_CHOICE,
              orderNumber: 3,
              answers: [
                {
                  answerText: "Unsafe and illegal",
                  isCorrect: true,
                  orderNumber: 1,
                },
                {
                  answerText: "Legal if traffic is slow",
                  isCorrect: false,
                  orderNumber: 2,
                },
                {
                  answerText: "Allowed for adult drivers anytime",
                  isCorrect: false,
                  orderNumber: 3,
                },
                {
                  answerText: "Required for navigation only",
                  isCorrect: false,
                  orderNumber: 4,
                },
              ],
            },
            {
              question:
                "Minors may never use a cell phone while driving under any circumstance.",
              explanation:
                "Minors may use a cell phone to make a call for emergency assistance.",
              category: "safe-driving",
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

export const unit09: UnitSeed = {
  title: "Alcohol and Drugs",
  description:
    "Understand California DUI laws, BAC limits, implied consent, open container rules, and special rules for drivers under 21.",
  orderNumber: 9,
  chapters: [
    {
      title: "DUI Laws and BAC Limits",
      description:
        "Blood alcohol concentration limits, implied consent, and DUI arrest procedures.",
      orderNumber: 1,
      lessons: [
        {
          title: "DUI Laws and Blood Alcohol Concentration",
          description:
            "California DUI laws apply to alcohol and drugs that affect your ability to drive.",
          estimatedDuration: 12,
          orderNumber: 1,
          blocks: [
            {
              type: ContentBlockType.HEADING,
              orderNumber: 1,
              content: { text: "Alcohol and Drugs", level: 1 },
            },
            {
              type: ContentBlockType.PARAGRAPH,
              orderNumber: 2,
              content: {
                text: "California's driving under the influence (DUI) laws apply to both alcohol and drugs. It is illegal to drive while under the influence of alcohol or any drug that affects your ability to drive safely. The law does not see a difference between illegal drugs and medications from a doctor or pharmacy.",
              },
            },
            {
              type: ContentBlockType.CALLOUT,
              orderNumber: 3,
              content: {
                title: "Important",
                text: "No matter what age you are, it is illegal to drive after drinking excessive amounts of alcohol, taking any drug that affects your ability to drive, or using any combination that decreases your ability to drive safely.",
                variant: "warning",
              },
            },
            {
              type: ContentBlockType.HEADING,
              orderNumber: 4,
              content: {
                text: "Blood Alcohol Concentration (BAC) Limits",
                level: 2,
              },
            },
            {
              type: ContentBlockType.CHECKLIST,
              orderNumber: 5,
              content: {
                title: "Illegal BAC Levels",
                items: [
                  "0.08% or higher if you are over 21 years old.",
                  "0.01% or higher if you are under 21 years old.",
                  "0.01% or higher at any age if you are on DUI probation.",
                  "0.04% or higher if you drive a vehicle that requires a commercial driver's license.",
                  "0.04% or higher if you are driving a passenger for hire.",
                ],
              },
            },
            {
              type: ContentBlockType.PARAGRAPH,
              orderNumber: 6,
              content: {
                text: "If you drive with an illegal BAC, a law enforcement officer can charge you with DUI. Even if your BAC is below legal limits, you may still be arrested and convicted of a DUI if you are impaired.",
              },
            },
          ],
          questions: [
            {
              question:
                "What is the illegal BAC limit for drivers over 21 in California?",
              explanation:
                "It is illegal to drive with a BAC of 0.08% or higher if you are over 21 years old.",
              category: "alcohol-drugs",
              questionType: QuestionType.MULTIPLE_CHOICE,
              orderNumber: 1,
              answers: [
                {
                  answerText: "0.08% or higher",
                  isCorrect: true,
                  orderNumber: 1,
                },
                {
                  answerText: "0.05% or higher",
                  isCorrect: false,
                  orderNumber: 2,
                },
                {
                  answerText: "0.10% or higher",
                  isCorrect: false,
                  orderNumber: 3,
                },
                {
                  answerText: "0.04% or higher",
                  isCorrect: false,
                  orderNumber: 4,
                },
              ],
            },
            {
              question:
                "What is the illegal BAC limit for drivers under 21?",
              explanation:
                "It is illegal for drivers under 21 to drive with a BAC of 0.01% or higher.",
              category: "alcohol-drugs",
              questionType: QuestionType.MULTIPLE_CHOICE,
              orderNumber: 2,
              answers: [
                {
                  answerText: "0.01% or higher",
                  isCorrect: true,
                  orderNumber: 1,
                },
                {
                  answerText: "0.08% or higher",
                  isCorrect: false,
                  orderNumber: 2,
                },
                {
                  answerText: "0.05% or higher",
                  isCorrect: false,
                  orderNumber: 3,
                },
                {
                  answerText: "Any detectable amount",
                  isCorrect: false,
                  orderNumber: 4,
                },
              ],
            },
            {
              question:
                "Commercial drivers may not drive with a BAC of 0.04% or higher.",
              explanation:
                "It is illegal to drive a commercial vehicle with a BAC of 0.04% or higher.",
              category: "alcohol-drugs",
              questionType: QuestionType.TRUE_FALSE,
              orderNumber: 3,
              answers: [
                { answerText: "True", isCorrect: true, orderNumber: 1 },
                { answerText: "False", isCorrect: false, orderNumber: 2 },
              ],
            },
            {
              question:
                "California DUI laws apply only to alcohol, not drugs.",
              explanation:
                "California's DUI laws apply to both alcohol and drugs that affect your ability to drive.",
              category: "alcohol-drugs",
              questionType: QuestionType.TRUE_FALSE,
              orderNumber: 4,
              answers: [
                { answerText: "True", isCorrect: false, orderNumber: 1 },
                { answerText: "False", isCorrect: true, orderNumber: 2 },
              ],
            },
          ],
        },
        {
          title: "Implied Consent and DUI Arrests",
          description:
            "Your obligation to submit to chemical tests and consequences of DUI arrests.",
          estimatedDuration: 10,
          orderNumber: 2,
          blocks: [
            {
              type: ContentBlockType.HEADING,
              orderNumber: 1,
              content: { text: "Implied Consent", level: 1 },
            },
            {
              type: ContentBlockType.PARAGRAPH,
              orderNumber: 2,
              content: {
                text: "When you drive in California, you consent to a breath, blood, or urine test if a law enforcement officer suspects you of DUI. If you refuse to take one, DMV will suspend or revoke your driving privilege for one year.",
              },
            },
            {
              type: ContentBlockType.HEADING,
              orderNumber: 3,
              content: { text: "DUI Arrests", level: 2 },
            },
            {
              type: ContentBlockType.CHECKLIST,
              orderNumber: 4,
              content: {
                title: "If You Are Arrested for DUI",
                items: [
                  "DMV must suspend your driving privilege under Administrative Per Se law.",
                  "The officer may take your driver's license and give you a temporary license for 30 days.",
                  "You may request a DMV administrative hearing within 10 days of arrest.",
                ],
              },
            },
            {
              type: ContentBlockType.HEADING,
              orderNumber: 5,
              content: { text: "DUI Convictions", level: 2 },
            },
            {
              type: ContentBlockType.PARAGRAPH,
              orderNumber: 6,
              content: {
                text: "If convicted of a DUI, DMV will suspend or revoke your driving privilege for one year. You must complete a DUI program, file a California Insurance Proof Certificate (SR 22/SR 1P), and may be required to install an ignition interlock device. All DUI convictions remain on your driver's record for 10 years.",
              },
            },
          ],
          questions: [
            {
              question:
                "When you drive in California, you consent to chemical testing if suspected of DUI. This is called:",
              explanation:
                "Implied consent means you agree to breath, blood, or urine tests when driving in California.",
              category: "alcohol-drugs",
              questionType: QuestionType.MULTIPLE_CHOICE,
              orderNumber: 1,
              answers: [
                {
                  answerText: "Implied consent",
                  isCorrect: true,
                  orderNumber: 1,
                },
                {
                  answerText: "Voluntary consent",
                  isCorrect: false,
                  orderNumber: 2,
                },
                {
                  answerText: "Written consent",
                  isCorrect: false,
                  orderNumber: 3,
                },
                {
                  answerText: "Emergency consent",
                  isCorrect: false,
                  orderNumber: 4,
                },
              ],
            },
            {
              question:
                "If you refuse a chemical test when suspected of DUI, DMV will suspend or revoke your driving privilege for:",
              explanation:
                "Refusing a chemical test results in a one-year suspension or revocation of driving privilege.",
              category: "alcohol-drugs",
              questionType: QuestionType.MULTIPLE_CHOICE,
              orderNumber: 2,
              answers: [
                {
                  answerText: "One year",
                  isCorrect: true,
                  orderNumber: 1,
                },
                {
                  answerText: "30 days",
                  isCorrect: false,
                  orderNumber: 2,
                },
                {
                  answerText: "Six months",
                  isCorrect: false,
                  orderNumber: 3,
                },
                {
                  answerText: "Two years",
                  isCorrect: false,
                  orderNumber: 4,
                },
              ],
            },
            {
              question:
                "You may request a DMV administrative hearing within 10 days of a DUI arrest.",
              explanation:
                "The handbook states you may request a DMV administrative hearing within 10 days from the date of arrest.",
              category: "alcohol-drugs",
              questionType: QuestionType.TRUE_FALSE,
              orderNumber: 3,
              answers: [
                { answerText: "True", isCorrect: true, orderNumber: 1 },
                { answerText: "False", isCorrect: false, orderNumber: 2 },
              ],
            },
            {
              question:
                "DUI convictions remain on your California driver's record for:",
              explanation:
                "All DUI convictions remain on your driver's record for 10 years.",
              category: "alcohol-drugs",
              questionType: QuestionType.MULTIPLE_CHOICE,
              orderNumber: 4,
              answers: [
                {
                  answerText: "10 years",
                  isCorrect: true,
                  orderNumber: 1,
                },
                {
                  answerText: "3 years",
                  isCorrect: false,
                  orderNumber: 2,
                },
                {
                  answerText: "5 years",
                  isCorrect: false,
                  orderNumber: 3,
                },
                {
                  answerText: "7 years",
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
      title: "Alcohol Rules for Drivers",
      description:
        "Open container laws, alcohol in vehicles, and additional rules for drivers under 21.",
      orderNumber: 2,
      lessons: [
        {
          title: "Open Container Rules and Alcohol in Vehicles",
          description:
            "Rules for carrying and consuming alcohol or cannabis in a vehicle.",
          estimatedDuration: 10,
          orderNumber: 1,
          blocks: [
            {
              type: ContentBlockType.HEADING,
              orderNumber: 1,
              content: {
                text: "Use or Possession of Alcohol or Cannabis in a Vehicle",
                level: 1,
              },
            },
            {
              type: ContentBlockType.PARAGRAPH,
              orderNumber: 2,
              content: {
                text: "It is illegal to drink any alcohol or to smoke or eat a cannabis product while you are driving or riding as a passenger in a vehicle.",
              },
            },
            {
              type: ContentBlockType.CHECKLIST,
              orderNumber: 3,
              content: {
                title: "Carrying Alcohol or Cannabis",
                items: [
                  "The container must be sealed and unopened.",
                  "If open, keep the container in the trunk or a place where passengers do not sit.",
                  "It is illegal to keep an open container of alcohol in your glove box.",
                ],
              },
            },
            {
              type: ContentBlockType.CALLOUT,
              orderNumber: 4,
              content: {
                title: "Exception",
                text: "Open container rules do not apply if you are a passenger in a bus, taxi, camper, or motorhome.",
                variant: "info",
              },
            },
          ],
          questions: [
            {
              question:
                "Where must an open container of alcohol be kept in a vehicle?",
              explanation:
                "Open containers must be kept in the trunk or a place where passengers do not sit.",
              category: "alcohol-drugs",
              questionType: QuestionType.MULTIPLE_CHOICE,
              orderNumber: 1,
              answers: [
                {
                  answerText:
                    "In the trunk or where passengers do not sit",
                  isCorrect: true,
                  orderNumber: 1,
                },
                {
                  answerText: "In the glove box",
                  isCorrect: false,
                  orderNumber: 2,
                },
                {
                  answerText: "On the front seat",
                  isCorrect: false,
                  orderNumber: 3,
                },
                {
                  answerText: "In the center console",
                  isCorrect: false,
                  orderNumber: 4,
                },
              ],
            },
            {
              question:
                "It is illegal to keep an open container of alcohol in the glove box.",
              explanation:
                "The handbook explicitly states it is illegal to keep an open container of alcohol in your glove box.",
              category: "alcohol-drugs",
              questionType: QuestionType.TRUE_FALSE,
              orderNumber: 2,
              answers: [
                { answerText: "True", isCorrect: true, orderNumber: 1 },
                { answerText: "False", isCorrect: false, orderNumber: 2 },
              ],
            },
            {
              question:
                "You may drink alcohol while driving if the container is sealed.",
              explanation:
                "It is illegal to drink any alcohol while driving, regardless of container status.",
              category: "alcohol-drugs",
              questionType: QuestionType.TRUE_FALSE,
              orderNumber: 3,
              answers: [
                { answerText: "True", isCorrect: false, orderNumber: 1 },
                { answerText: "False", isCorrect: true, orderNumber: 2 },
              ],
            },
            {
              question:
                "Open container rules do not apply to passengers in which vehicles?",
              explanation:
                "The exception applies to passengers in a bus, taxi, camper, or motorhome.",
              category: "alcohol-drugs",
              questionType: QuestionType.MULTIPLE_CHOICE,
              orderNumber: 4,
              answers: [
                {
                  answerText: "Bus, taxi, camper, or motorhome",
                  isCorrect: true,
                  orderNumber: 1,
                },
                {
                  answerText: "Any private passenger car",
                  isCorrect: false,
                  orderNumber: 2,
                },
                {
                  answerText: "Motorcycles only",
                  isCorrect: false,
                  orderNumber: 3,
                },
                {
                  answerText: "Rental cars only",
                  isCorrect: false,
                  orderNumber: 4,
                },
              ],
            },
          ],
        },
        {
          title: "Drivers Under 21",
          description:
            "Additional alcohol possession and consumption laws for young drivers.",
          estimatedDuration: 10,
          orderNumber: 2,
          blocks: [
            {
              type: ContentBlockType.HEADING,
              orderNumber: 1,
              content: { text: "Drivers Under 21", level: 1 },
            },
            {
              type: ContentBlockType.PARAGRAPH,
              orderNumber: 2,
              content: {
                text: "If you are under 21 years old, there are additional laws for possessing and consuming alcohol. You may not carry any alcohol beverage inside a vehicle unless an individual who is 21 years old or older is with you. The container must be full, sealed, and unopened.",
              },
            },
            {
              type: ContentBlockType.CALLOUT,
              orderNumber: 3,
              content: {
                title: "Penalties",
                text: "If caught with alcohol in your vehicle, law enforcement can impound your vehicle for up to 30 days. The court may fine you and suspend your driver's license for one year.",
                variant: "warning",
              },
            },
            {
              type: ContentBlockType.CHECKLIST,
              orderNumber: 4,
              content: {
                title: "Under-21 DUI Rules",
                items: [
                  "If convicted of DUI with BAC of 0.01% or higher, DMV may revoke your driving privilege for one year.",
                  "If PAS shows BAC of 0.05% or higher, the officer may require a breath or blood test.",
                  "If a later test shows BAC of 0.05% or higher, you may be arrested for DUI.",
                ],
              },
            },
          ],
          questions: [
            {
              question:
                "Drivers under 21 may carry alcohol in a vehicle only if:",
              explanation:
                "A person 21 or older must be present, and the container must be full, sealed, and unopened.",
              category: "alcohol-drugs",
              questionType: QuestionType.MULTIPLE_CHOICE,
              orderNumber: 1,
              answers: [
                {
                  answerText:
                    "A person 21 or older is present and the container is sealed",
                  isCorrect: true,
                  orderNumber: 1,
                },
                {
                  answerText: "The alcohol is in the trunk only",
                  isCorrect: false,
                  orderNumber: 2,
                },
                {
                  answerText: "They have a note from a parent",
                  isCorrect: false,
                  orderNumber: 3,
                },
                {
                  answerText: "The container is less than half full",
                  isCorrect: false,
                  orderNumber: 4,
                },
              ],
            },
            {
              question:
                "If an under-21 driver is convicted of DUI with a BAC of 0.01% or higher, DMV may revoke their driving privilege for:",
              explanation:
                "DMV may revoke driving privilege for one year with BAC of 0.01% or higher for under-21 drivers.",
              category: "alcohol-drugs",
              questionType: QuestionType.MULTIPLE_CHOICE,
              orderNumber: 2,
              answers: [
                {
                  answerText: "One year",
                  isCorrect: true,
                  orderNumber: 1,
                },
                {
                  answerText: "30 days",
                  isCorrect: false,
                  orderNumber: 2,
                },
                {
                  answerText: "Six months",
                  isCorrect: false,
                  orderNumber: 3,
                },
                {
                  answerText: "Two years",
                  isCorrect: false,
                  orderNumber: 4,
                },
              ],
            },
            {
              question:
                "If a PAS test shows a BAC of 0.05% or higher for an under-21 driver, the officer may require additional testing.",
              explanation:
                "The handbook states an officer may require a breath or blood test if PAS shows 0.05% or higher.",
              category: "alcohol-drugs",
              questionType: QuestionType.TRUE_FALSE,
              orderNumber: 3,
              answers: [
                { answerText: "True", isCorrect: true, orderNumber: 1 },
                { answerText: "False", isCorrect: false, orderNumber: 2 },
              ],
            },
            {
              question:
                "If caught with alcohol in their vehicle, an under-21 driver may have their vehicle impounded for up to:",
              explanation:
                "Law enforcement can impound the vehicle for up to 30 days.",
              category: "alcohol-drugs",
              questionType: QuestionType.MULTIPLE_CHOICE,
              orderNumber: 4,
              answers: [
                {
                  answerText: "30 days",
                  isCorrect: true,
                  orderNumber: 1,
                },
                {
                  answerText: "7 days",
                  isCorrect: false,
                  orderNumber: 2,
                },
                {
                  answerText: "14 days",
                  isCorrect: false,
                  orderNumber: 3,
                },
                {
                  answerText: "90 days",
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

export const unit10: UnitSeed = {
  title: "Financial Responsibility, Insurance, and Collisions",
  description:
    "Learn insurance requirements, what to do after a collision, DMV reporting rules, and hit-and-run penalties.",
  orderNumber: 10,
  chapters: [
    {
      title: "Insurance and Financial Responsibility",
      description:
        "Minimum insurance coverage and financial responsibility for drivers.",
      orderNumber: 1,
      lessons: [
        {
          title: "Insurance Requirements",
          description:
            "Minimum liability coverage required to drive in California.",
          estimatedDuration: 10,
          orderNumber: 1,
          blocks: [
            {
              type: ContentBlockType.HEADING,
              orderNumber: 1,
              content: {
                text: "Financial Responsibility and Insurance",
                level: 1,
              },
            },
            {
              type: ContentBlockType.PARAGRAPH,
              orderNumber: 2,
              content: {
                text: "You must have your proof of financial responsibility (insurance) when you drive and for a drive test. If you get into a collision, you must show proof to the other drivers involved.",
              },
            },
            {
              type: ContentBlockType.HEADING,
              orderNumber: 3,
              content: { text: "Insurance Requirements", level: 2 },
            },
            {
              type: ContentBlockType.CHECKLIST,
              orderNumber: 4,
              content: {
                title: "Minimum Coverage",
                items: [
                  "$30,000 for a single death or injury.",
                  "$60,000 for death or injury to more than one person.",
                  "$15,000 for property damage.",
                ],
              },
            },
            {
              type: ContentBlockType.CALLOUT,
              orderNumber: 5,
              content: {
                title: "Verify Your Provider",
                text: "Before you buy insurance, make sure the agent, broker, or insurance provider is licensed by the California Department of Insurance.",
                variant: "tip",
              },
            },
          ],
          questions: [
            {
              question:
                "What is the minimum insurance coverage for a single death or injury?",
              explanation:
                "California requires at least $30,000 for a single death or injury.",
              category: "insurance-collisions",
              questionType: QuestionType.MULTIPLE_CHOICE,
              orderNumber: 1,
              answers: [
                {
                  answerText: "$30,000",
                  isCorrect: true,
                  orderNumber: 1,
                },
                {
                  answerText: "$15,000",
                  isCorrect: false,
                  orderNumber: 2,
                },
                {
                  answerText: "$5,000",
                  isCorrect: false,
                  orderNumber: 3,
                },
                {
                  answerText: "$25,000",
                  isCorrect: false,
                  orderNumber: 4,
                },
              ],
            },
            {
              question:
                "What is the minimum coverage for death or injury to more than one person?",
              explanation:
                "Insurance must cover at least $60,000 for death or injury to more than one person.",
              category: "insurance-collisions",
              questionType: QuestionType.MULTIPLE_CHOICE,
              orderNumber: 2,
              answers: [
                {
                  answerText: "$60,000",
                  isCorrect: true,
                  orderNumber: 1,
                },
                {
                  answerText: "$15,000",
                  isCorrect: false,
                  orderNumber: 2,
                },
                {
                  answerText: "$30,000",
                  isCorrect: false,
                  orderNumber: 3,
                },
                {
                  answerText: "$10,000",
                  isCorrect: false,
                  orderNumber: 4,
                },
              ],
            },
            {
              question:
                "You must carry proof of insurance when driving in California.",
              explanation:
                "You must have proof of financial responsibility when you drive and for a drive test.",
              category: "insurance-collisions",
              questionType: QuestionType.TRUE_FALSE,
              orderNumber: 3,
              answers: [
                { answerText: "True", isCorrect: true, orderNumber: 1 },
                { answerText: "False", isCorrect: false, orderNumber: 2 },
              ],
            },
            {
              question:
                "What is the minimum property damage coverage required?",
              explanation:
                "Insurance must cover at least $15,000 for property damage.",
              category: "insurance-collisions",
              questionType: QuestionType.MULTIPLE_CHOICE,
              orderNumber: 4,
              answers: [
                {
                  answerText: "$15,000",
                  isCorrect: true,
                  orderNumber: 1,
                },
                {
                  answerText: "$5,000",
                  isCorrect: false,
                  orderNumber: 2,
                },
                {
                  answerText: "$10,000",
                  isCorrect: false,
                  orderNumber: 3,
                },
                {
                  answerText: "$3,000",
                  isCorrect: false,
                  orderNumber: 4,
                },
              ],
            },
          ],
        },
        {
          title: "Financial Responsibility for Young Drivers",
          description:
            "Parent responsibility and penalties for driving without insurance.",
          estimatedDuration: 8,
          orderNumber: 2,
          blocks: [
            {
              type: ContentBlockType.HEADING,
              orderNumber: 1,
              content: { text: "Who Is Financially Responsible?", level: 1 },
            },
            {
              type: ContentBlockType.PARAGRAPH,
              orderNumber: 2,
              content: {
                text: "Parents or guardians take on financial responsibility for drivers younger than 18 years old and pay for damages if the driver is involved in a collision. Drivers who are 18 years old and older take on their own financial responsibility.",
              },
            },
            {
              type: ContentBlockType.HEADING,
              orderNumber: 3,
              content: { text: "Driving Without Insurance", level: 2 },
            },
            {
              type: ContentBlockType.PARAGRAPH,
              orderNumber: 4,
              content: {
                text: "Your driving privilege will be suspended for up to four years if you are in a collision and do not have proper insurance coverage. It does not matter who was at fault.",
              },
            },
            {
              type: ContentBlockType.CALLOUT,
              orderNumber: 5,
              content: {
                title: "Getting Your License Back",
                text: "You can get your driver's license back during the last three years of the suspension if you provide a California Insurance Proof Certificate (SR 22/SR 1P) and maintain it during the three-year period.",
                variant: "info",
              },
            },
          ],
          questions: [
            {
              question:
                "Who is financially responsible for a driver younger than 18?",
              explanation:
                "Parents or guardians take on financial responsibility for drivers younger than 18.",
              category: "insurance-collisions",
              questionType: QuestionType.MULTIPLE_CHOICE,
              orderNumber: 1,
              answers: [
                {
                  answerText: "Parents or guardians",
                  isCorrect: true,
                  orderNumber: 1,
                },
                {
                  answerText: "The DMV",
                  isCorrect: false,
                  orderNumber: 2,
                },
                {
                  answerText: "The insurance company only",
                  isCorrect: false,
                  orderNumber: 3,
                },
                {
                  answerText: "No one is responsible",
                  isCorrect: false,
                  orderNumber: 4,
                },
              ],
            },
            {
              question:
                "If you are in a collision without insurance, your driving privilege may be suspended for up to:",
              explanation:
                "Driving without insurance in a collision can result in suspension for up to four years.",
              category: "insurance-collisions",
              questionType: QuestionType.MULTIPLE_CHOICE,
              orderNumber: 2,
              answers: [
                {
                  answerText: "Four years",
                  isCorrect: true,
                  orderNumber: 1,
                },
                {
                  answerText: "One year",
                  isCorrect: false,
                  orderNumber: 2,
                },
                {
                  answerText: "30 days",
                  isCorrect: false,
                  orderNumber: 3,
                },
                {
                  answerText: "Six months",
                  isCorrect: false,
                  orderNumber: 4,
                },
              ],
            },
            {
              question:
                "It matters who was at fault when determining suspension for driving without insurance in a collision.",
              explanation:
                "The handbook states it does not matter who was at fault.",
              category: "insurance-collisions",
              questionType: QuestionType.TRUE_FALSE,
              orderNumber: 3,
              answers: [
                { answerText: "True", isCorrect: false, orderNumber: 1 },
                { answerText: "False", isCorrect: true, orderNumber: 2 },
              ],
            },
          ],
        },
      ],
    },
    {
      title: "Collisions and Reporting",
      description:
        "What to do at the scene, hit-and-run laws, and DMV collision reporting.",
      orderNumber: 2,
      lessons: [
        {
          title: "What to Do in a Collision",
          description:
            "Steps to take at the scene and hit-and-run consequences.",
          estimatedDuration: 12,
          orderNumber: 1,
          blocks: [
            {
              type: ContentBlockType.HEADING,
              orderNumber: 1,
              content: { text: "Collisions", level: 1 },
            },
            {
              type: ContentBlockType.HEADING,
              orderNumber: 2,
              content: { text: "Common Causes of Collisions", level: 2 },
            },
            {
              type: ContentBlockType.CHECKLIST,
              orderNumber: 3,
              content: {
                title: "Most Common Causes",
                items: [
                  "Driver distractions.",
                  "Unsafe speed.",
                  "Improper turns.",
                  "Not following right-of-way rules.",
                  "Not following stop signals and signs.",
                  "Driving on the wrong side of the road.",
                ],
              },
            },
            {
              type: ContentBlockType.HEADING,
              orderNumber: 4,
              content: { text: "At the Scene", level: 2 },
            },
            {
              type: ContentBlockType.CHECKLIST,
              orderNumber: 5,
              content: {
                title: "If You Are in a Collision",
                items: [
                  "You must stop. Someone could be injured and need your help.",
                  "Call 911 right away if anyone is hurt.",
                  "Move your vehicle out of traffic if no one is hurt, then call 911.",
                  "Show your license, registration, insurance, and current address.",
                  "Report to law enforcement within 24 hours if anyone is injured or killed.",
                ],
              },
            },
            {
              type: ContentBlockType.CALLOUT,
              orderNumber: 6,
              content: {
                title: "Hit-and-Run",
                text: "Failing to stop or leaving the scene of an accident is called a hit-and-run. The punishment is severe if you are convicted of a hit-and-run.",
                variant: "warning",
              },
            },
          ],
          questions: [
            {
              question:
                "Failing to stop or leaving the scene of an accident is called:",
              explanation:
                "Leaving the scene of an accident is called a hit-and-run.",
              category: "insurance-collisions",
              questionType: QuestionType.MULTIPLE_CHOICE,
              orderNumber: 1,
              answers: [
                {
                  answerText: "Hit-and-run",
                  isCorrect: true,
                  orderNumber: 1,
                },
                {
                  answerText: "Failure to yield",
                  isCorrect: false,
                  orderNumber: 2,
                },
                {
                  answerText: "Reckless driving",
                  isCorrect: false,
                  orderNumber: 3,
                },
                {
                  answerText: "Implied consent violation",
                  isCorrect: false,
                  orderNumber: 4,
                },
              ],
            },
            {
              question:
                "If anyone is injured in a collision, you must report it to law enforcement within:",
              explanation:
                "You must make a report to law enforcement within 24 hours if anyone is injured or killed.",
              category: "insurance-collisions",
              questionType: QuestionType.MULTIPLE_CHOICE,
              orderNumber: 2,
              answers: [
                {
                  answerText: "24 hours",
                  isCorrect: true,
                  orderNumber: 1,
                },
                {
                  answerText: "10 days",
                  isCorrect: false,
                  orderNumber: 2,
                },
                {
                  answerText: "48 hours",
                  isCorrect: false,
                  orderNumber: 3,
                },
                {
                  answerText: "7 days",
                  isCorrect: false,
                  orderNumber: 4,
                },
              ],
            },
            {
              question:
                "You must stop at the scene of a collision.",
              explanation:
                "The handbook states you must stop because someone could be injured and need your help.",
              category: "insurance-collisions",
              questionType: QuestionType.TRUE_FALSE,
              orderNumber: 3,
              answers: [
                { answerText: "True", isCorrect: true, orderNumber: 1 },
                { answerText: "False", isCorrect: false, orderNumber: 2 },
              ],
            },
            {
              question:
                "If your vehicle hits a parked car and you cannot find the owner, you should:",
              explanation:
                "Leave a note with your name, phone number, and address securely attached to the vehicle or property, and report to law enforcement.",
              category: "insurance-collisions",
              questionType: QuestionType.MULTIPLE_CHOICE,
              orderNumber: 4,
              answers: [
                {
                  answerText:
                    "Leave a note with your contact information and report to law enforcement",
                  isCorrect: true,
                  orderNumber: 1,
                },
                {
                  answerText: "Drive away if damage is minor",
                  isCorrect: false,
                  orderNumber: 2,
                },
                {
                  answerText: "Wait indefinitely for the owner",
                  isCorrect: false,
                  orderNumber: 3,
                },
                {
                  answerText: "Only report to your insurance company",
                  isCorrect: false,
                  orderNumber: 4,
                },
              ],
            },
          ],
        },
        {
          title: "Reporting Collisions to the DMV",
          description:
            "When and how to file an SR 1 report with the DMV.",
          estimatedDuration: 10,
          orderNumber: 2,
          blocks: [
            {
              type: ContentBlockType.HEADING,
              orderNumber: 1,
              content: { text: "Reporting a Collision to DMV", level: 1 },
            },
            {
              type: ContentBlockType.PARAGRAPH,
              orderNumber: 2,
              content: {
                text: "If you are in a collision, you must report it to DMV within 10 days if the collision caused more than $1,000 in damage to property, or if anyone was injured or killed — even if the injuries were minor.",
              },
            },
            {
              type: ContentBlockType.CALLOUT,
              orderNumber: 3,
              content: {
                title: "SR 1 Report",
                text: "Each driver must file a Report of Traffic Accident Occurring in California (SR 1) with DMV at dmv.ca.gov/accidentreport. You must file whether or not you caused the collision. This applies even if the collision happened on private property.",
                variant: "info",
              },
            },
            {
              type: ContentBlockType.PARAGRAPH,
              orderNumber: 4,
              content: {
                text: "Your driving privilege will be suspended if you fail to file a report. Law enforcement will not make the report for you.",
              },
            },
            {
              type: ContentBlockType.HEADING,
              orderNumber: 5,
              content: { text: "Collisions on Your Driver's Record", level: 2 },
            },
            {
              type: ContentBlockType.PARAGRAPH,
              orderNumber: 6,
              content: {
                text: "If you are involved in a collision resulting in $1,000 in damage, or where anyone is injured or dies, it is your responsibility to report the collision to DMV. DMV will add it to your driver's record. It does not matter who caused the collision.",
              },
            },
          ],
          questions: [
            {
              question:
                "You must report a collision to the DMV within 10 days if property damage exceeds:",
              explanation:
                "You must report to DMV within 10 days if damage exceeds $1,000.",
              category: "insurance-collisions",
              questionType: QuestionType.MULTIPLE_CHOICE,
              orderNumber: 1,
              answers: [
                {
                  answerText: "$1,000",
                  isCorrect: true,
                  orderNumber: 1,
                },
                {
                  answerText: "$500",
                  isCorrect: false,
                  orderNumber: 2,
                },
                {
                  answerText: "$5,000",
                  isCorrect: false,
                  orderNumber: 3,
                },
                {
                  answerText: "$750",
                  isCorrect: false,
                  orderNumber: 4,
                },
              ],
            },
            {
              question:
                "Which form must be filed with the DMV after a reportable collision?",
              explanation:
                "Drivers must file a Report of Traffic Accident Occurring in California (SR 1).",
              category: "insurance-collisions",
              questionType: QuestionType.MULTIPLE_CHOICE,
              orderNumber: 2,
              answers: [
                {
                  answerText: "SR 1",
                  isCorrect: true,
                  orderNumber: 1,
                },
                {
                  answerText: "SR 22",
                  isCorrect: false,
                  orderNumber: 2,
                },
                {
                  answerText: "DL 44",
                  isCorrect: false,
                  orderNumber: 3,
                },
                {
                  answerText: "REG 262",
                  isCorrect: false,
                  orderNumber: 4,
                },
              ],
            },
            {
              question:
                "Law enforcement will file the SR 1 report to the DMV for you.",
              explanation:
                "Law enforcement will not make the report for you. Each driver must file the SR 1.",
              category: "insurance-collisions",
              questionType: QuestionType.TRUE_FALSE,
              orderNumber: 3,
              answers: [
                { answerText: "True", isCorrect: false, orderNumber: 1 },
                { answerText: "False", isCorrect: true, orderNumber: 2 },
              ],
            },
            {
              question:
                "You must file an SR 1 report even if you did not cause the collision.",
              explanation:
                "Each driver must file a report whether or not they caused the collision.",
              category: "insurance-collisions",
              questionType: QuestionType.TRUE_FALSE,
              orderNumber: 4,
              answers: [
                { answerText: "True", isCorrect: true, orderNumber: 1 },
                { answerText: "False", isCorrect: false, orderNumber: 2 },
              ],
            },
            {
              question:
                "Failure to file a required collision report with the DMV can result in:",
              explanation:
                "Your driving privilege will be suspended if you fail to file a report.",
              category: "insurance-collisions",
              questionType: QuestionType.MULTIPLE_CHOICE,
              orderNumber: 5,
              answers: [
                {
                  answerText: "Suspension of your driving privilege",
                  isCorrect: true,
                  orderNumber: 1,
                },
                {
                  answerText: "A warning letter only",
                  isCorrect: false,
                  orderNumber: 2,
                },
                {
                  answerText: "Automatic insurance cancellation",
                  isCorrect: false,
                  orderNumber: 3,
                },
                {
                  answerText: "Vehicle impoundment for 30 days",
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
