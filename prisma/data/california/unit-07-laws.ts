import { ContentBlockType, QuestionType } from "@prisma/client";
import type { UnitSeed } from "../types";

export const unit07: UnitSeed = {
  title: "Laws and Rules of the Road",
  description:
    "Traffic signals, signs, right-of-way, sharing the road, and California speed limits from the California Driver's Handbook (DL 600, Rev. 6/2025).",
  orderNumber: 7,
  chapters: [
    {
      title: "Traffic Signals and Pedestrian Signals",
      description:
        "Understanding vehicle traffic signals, arrows, flashing lights, and pedestrian signals.",
      orderNumber: 1,
      lessons: [
        {
          title: "Solid Red, Yellow, and Green Lights",
          description:
            "What solid red, yellow, and green traffic signal lights mean and when you may turn on red.",
          estimatedDuration: 12,
          orderNumber: 1,
          blocks: [
            {
              type: ContentBlockType.HEADING,
              orderNumber: 1,
              content: { text: "Traffic Control", level: 1 },
            },
            {
              type: ContentBlockType.PARAGRAPH,
              orderNumber: 2,
              content: {
                text: "When at or approaching traffic signals or signs, yield to pedestrians, bicyclists, and other nearby vehicles that may have the right-of-way. See Right of Way Rules: Who Goes First, in this section.",
              },
            },
            {
              type: ContentBlockType.HEADING,
              orderNumber: 3,
              content: { text: "Solid Red Light", level: 2 },
            },
            {
              type: ContentBlockType.PARAGRAPH,
              orderNumber: 4,
              content: {
                text: "A red traffic signal light means STOP. You can turn right at a red light, if: there is not a NO TURN ON RED sign posted; you stop at the stop or limit line, yield for pedestrians, and turn when it is safe.",
              },
            },
            {
              type: ContentBlockType.HEADING,
              orderNumber: 5,
              content: { text: "Solid Yellow and Green Lights", level: 2 },
            },
            {
              type: ContentBlockType.CHECKLIST,
              orderNumber: 6,
              content: {
                title: "Yellow and Green Signal Rules",
                items: [
                  "Solid yellow: CAUTION. The light is about to turn red. Stop if you can do so safely; otherwise, cautiously cross the intersection.",
                  "Solid green: GO. Still stop for any vehicle, bicyclist, or pedestrian in the intersection.",
                  "Do not enter the intersection if you cannot get completely across before the light turns red.",
                ],
              },
            },
            {
              type: ContentBlockType.CALLOUT,
              orderNumber: 7,
              content: {
                title: "Red Arrow",
                text: "A red arrow means STOP. Do not turn at a red arrow. Remain stopped until a green traffic signal light or green arrow appears.",
                variant: "warning",
              },
            },
          ],
          questions: [
            {
              question: "What does a solid red traffic signal light mean?",
              explanation:
                "The handbook states a red traffic signal light means STOP.",
              category: "traffic-signals",
              questionType: QuestionType.MULTIPLE_CHOICE,
              orderNumber: 1,
              answers: [
                { answerText: "STOP", isCorrect: true, orderNumber: 1 },
                {
                  answerText: "Slow down and proceed with caution",
                  isCorrect: false,
                  orderNumber: 2,
                },
                { answerText: "GO if the way is clear", isCorrect: false, orderNumber: 3 },
                {
                  answerText: "Yield only to oncoming traffic",
                  isCorrect: false,
                  orderNumber: 4,
                },
              ],
            },
            {
              question:
                "You may turn right at a red light if there is no NO TURN ON RED sign posted.",
              explanation:
                "The handbook lists no NO TURN ON RED sign as one condition for turning right on red.",
              category: "traffic-signals",
              questionType: QuestionType.TRUE_FALSE,
              orderNumber: 2,
              answers: [
                { answerText: "True", isCorrect: true, orderNumber: 1 },
                { answerText: "False", isCorrect: false, orderNumber: 2 },
              ],
            },
            {
              question:
                "When you see a solid yellow traffic signal light, what should you do?",
              explanation:
                "A yellow light means CAUTION. Stop if you can do so safely; if not, cautiously cross the intersection.",
              category: "traffic-signals",
              questionType: QuestionType.MULTIPLE_CHOICE,
              orderNumber: 3,
              answers: [
                {
                  answerText: "Stop if you can do so safely; otherwise cautiously cross",
                  isCorrect: true,
                  orderNumber: 1,
                },
                {
                  answerText: "Speed up to beat the red light",
                  isCorrect: false,
                  orderNumber: 2,
                },
                {
                  answerText: "Always stop immediately regardless of safety",
                  isCorrect: false,
                  orderNumber: 3,
                },
                {
                  answerText: "Treat it the same as a green light",
                  isCorrect: false,
                  orderNumber: 4,
                },
              ],
            },
            {
              question: "You may turn at a red arrow after stopping.",
              explanation:
                "A red arrow means STOP. Do not turn at a red arrow. Remain stopped until a green light or green arrow appears.",
              category: "traffic-signals",
              questionType: QuestionType.TRUE_FALSE,
              orderNumber: 4,
              answers: [
                { answerText: "True", isCorrect: false, orderNumber: 1 },
                { answerText: "False", isCorrect: true, orderNumber: 2 },
              ],
            },
            {
              question:
                "Under a solid green light, when should you NOT enter the intersection?",
              explanation:
                "Do not enter if you cannot get completely across before the traffic signal light turns red.",
              category: "traffic-signals",
              questionType: QuestionType.MULTIPLE_CHOICE,
              orderNumber: 5,
              answers: [
                {
                  answerText:
                    "When you cannot get completely across before the light turns red",
                  isCorrect: true,
                  orderNumber: 1,
                },
                {
                  answerText: "When pedestrians are waiting on the sidewalk",
                  isCorrect: false,
                  orderNumber: 2,
                },
                {
                  answerText: "When it is raining",
                  isCorrect: false,
                  orderNumber: 3,
                },
                {
                  answerText: "When you are turning right",
                  isCorrect: false,
                  orderNumber: 4,
                },
              ],
            },
          ],
        },
        {
          title: "Arrows, Flashing Signals, and Non-Working Lights",
          description:
            "Green and yellow arrows, flashing signals, traffic lights that are not working, and pedestrian signals.",
          estimatedDuration: 14,
          orderNumber: 2,
          blocks: [
            {
              type: ContentBlockType.HEADING,
              orderNumber: 1,
              content: { text: "Arrows and Flashing Signals", level: 1 },
            },
            {
              type: ContentBlockType.CHECKLIST,
              orderNumber: 2,
              content: {
                title: "Arrow and Flashing Light Rules",
                items: [
                  "Green arrow: GO in the direction the arrow points. Oncoming vehicles are stopped by a red light.",
                  "Yellow arrow: Protected turning time is ending. Complete your turn cautiously if already in the intersection.",
                  "Flashing red: STOP. After stopping, you may go when it is safe.",
                  "Flashing yellow: PROCEED WITH CAUTION. Slow down and be alert. You do not need to stop.",
                  "Flashing yellow arrow: Turn is not protected. Yield to oncoming traffic and proceed with caution.",
                ],
              },
            },
            {
              type: ContentBlockType.HEADING,
              orderNumber: 3,
              content: { text: "Traffic Light Not Working", level: 2 },
            },
            {
              type: ContentBlockType.PARAGRAPH,
              orderNumber: 4,
              content: {
                text: "When a traffic light is not working, stop as if the intersection is controlled by STOP signs in all directions. Then proceed cautiously when it is safe to do so.",
              },
            },
            {
              type: ContentBlockType.HEADING,
              orderNumber: 5,
              content: { text: "Pedestrian Signals", level: 2 },
            },
            {
              type: ContentBlockType.CHECKLIST,
              orderNumber: 6,
              content: {
                title: "Pedestrian Signal Meanings",
                items: [
                  "WALK or Walking Person: You may cross the street.",
                  "DON'T WALK or Raised Hand: You may not cross the street.",
                  "Flashing DON'T WALK: Do not start crossing. Drivers must yield to pedestrians even if the light is flashing.",
                  "If there are no pedestrian signals, obey the vehicle traffic signals.",
                ],
              },
            },
            {
              type: ContentBlockType.CALLOUT,
              orderNumber: 7,
              content: {
                title: "Blind Pedestrians",
                text: "Sounds such as beeping, chirping, or verbal messages help blind or visually impaired pedestrians cross the street. A pedestrian push button activates the WALK signal.",
                variant: "info",
              },
            },
          ],
          questions: [
            {
              question: "What does a flashing red traffic signal light mean?",
              explanation:
                "A flashing red signal light means STOP. After stopping, you may go when it is safe.",
              category: "traffic-signals",
              questionType: QuestionType.MULTIPLE_CHOICE,
              orderNumber: 1,
              answers: [
                {
                  answerText: "STOP; after stopping, go when it is safe",
                  isCorrect: true,
                  orderNumber: 1,
                },
                {
                  answerText: "Proceed with caution without stopping",
                  isCorrect: false,
                  orderNumber: 2,
                },
                {
                  answerText: "Stop and wait for a green light",
                  isCorrect: false,
                  orderNumber: 3,
                },
                {
                  answerText: "Yield only to pedestrians",
                  isCorrect: false,
                  orderNumber: 4,
                },
              ],
            },
            {
              question:
                "A flashing yellow traffic signal light requires you to stop before proceeding.",
              explanation:
                "A flashing yellow light is a warning to PROCEED WITH CAUTION. You do not need to stop.",
              category: "traffic-signals",
              questionType: QuestionType.TRUE_FALSE,
              orderNumber: 2,
              answers: [
                { answerText: "True", isCorrect: false, orderNumber: 1 },
                { answerText: "False", isCorrect: true, orderNumber: 2 },
              ],
            },
            {
              question:
                "When a traffic light is not working, how should you treat the intersection?",
              explanation:
                "Stop as if the intersection is controlled by STOP signs in all directions, then proceed cautiously when safe.",
              category: "traffic-signals",
              questionType: QuestionType.MULTIPLE_CHOICE,
              orderNumber: 3,
              answers: [
                {
                  answerText:
                    "Stop as if STOP signs control all directions, then proceed cautiously",
                  isCorrect: true,
                  orderNumber: 1,
                },
                {
                  answerText: "Treat it as a four-way yield",
                  isCorrect: false,
                  orderNumber: 2,
                },
                {
                  answerText: "Proceed without stopping if no traffic is visible",
                  isCorrect: false,
                  orderNumber: 3,
                },
                {
                  answerText: "The vehicle on the right always goes first",
                  isCorrect: false,
                  orderNumber: 4,
                },
              ],
            },
            {
              question:
                "What does a green arrow traffic signal light allow you to do?",
              explanation:
                "A green arrow means GO in the direction the arrow is pointing. It allows a protected turn.",
              category: "traffic-signals",
              questionType: QuestionType.MULTIPLE_CHOICE,
              orderNumber: 4,
              answers: [
                {
                  answerText:
                    "GO in the direction the arrow points with a protected turn",
                  isCorrect: true,
                  orderNumber: 1,
                },
                {
                  answerText: "Turn after yielding to all traffic",
                  isCorrect: false,
                  orderNumber: 2,
                },
                {
                  answerText: "Stop and wait for a solid green light",
                  isCorrect: false,
                  orderNumber: 3,
                },
                {
                  answerText: "Proceed only if no pedestrians are present",
                  isCorrect: false,
                  orderNumber: 4,
                },
              ],
            },
            {
              question:
                "If there are no pedestrian signals at an intersection, pedestrians should obey vehicle traffic signals.",
              explanation:
                "The handbook states if there are no pedestrian signals, obey the vehicle traffic signals.",
              category: "traffic-signals",
              questionType: QuestionType.TRUE_FALSE,
              orderNumber: 5,
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
      title: "Traffic Signs",
      description:
        "STOP, YIELD, regulatory, warning, railroad, and school zone signs.",
      orderNumber: 2,
      lessons: [
        {
          title: "STOP, YIELD, and Regulatory Signs",
          description:
            "Mandatory stop and yield signs, red and white regulatory signs, and white rectangular signs.",
          estimatedDuration: 12,
          orderNumber: 1,
          blocks: [
            {
              type: ContentBlockType.HEADING,
              orderNumber: 1,
              content: { text: "Obey All Signs", level: 1 },
            },
            {
              type: ContentBlockType.PARAGRAPH,
              orderNumber: 2,
              content: {
                text: "Obey all warning signs regardless of their shape or color.",
              },
            },
            {
              type: ContentBlockType.HEADING,
              orderNumber: 3,
              content: { text: "STOP and YIELD Signs", level: 2 },
            },
            {
              type: ContentBlockType.CHECKLIST,
              orderNumber: 4,
              content: {
                title: "STOP and YIELD Requirements",
                items: [
                  "STOP sign: Make a full stop before entering the crosswalk or at the limit line. If there is no limit line or crosswalk, stop before entering the intersection. Check traffic in all directions before proceeding.",
                  "Red YIELD sign: Slow down and be ready to stop to let any vehicle, bicyclist, or pedestrian pass before you proceed.",
                ],
              },
            },
            {
              type: ContentBlockType.HEADING,
              orderNumber: 5,
              content: { text: "Red and White Regulatory Signs", level: 2 },
            },
            {
              type: ContentBlockType.PARAGRAPH,
              orderNumber: 6,
              content: {
                text: "Follow the sign's instruction. For example, DO NOT ENTER means do not enter the road or ramp where the sign is posted. If you enter a roadway against traffic, DO NOT ENTER and WRONG WAY signs may be posted. When it is safe, back out or turn around. At night, road reflectors shine red in your headlights if you are going the wrong way.",
              },
            },
            {
              type: ContentBlockType.CALLOUT,
              orderNumber: 7,
              content: {
                title: "White Regulatory Signs",
                text: "White rectangular signs communicate many important rules you must obey, such as NO PARKING ANY TIME, ONE WAY, and DO NOT BLOCK INTERSECTION.",
                variant: "info",
              },
            },
          ],
          questions: [
            {
              question:
                "Where must you stop at a STOP sign if there is a limit line?",
              explanation:
                "Make a full stop before entering the crosswalk or at the limit line.",
              category: "traffic-signs",
              questionType: QuestionType.MULTIPLE_CHOICE,
              orderNumber: 1,
              answers: [
                {
                  answerText: "Before entering the crosswalk or at the limit line",
                  isCorrect: true,
                  orderNumber: 1,
                },
                {
                  answerText: "In the middle of the intersection",
                  isCorrect: false,
                  orderNumber: 2,
                },
                {
                  answerText: "Only if other traffic is present",
                  isCorrect: false,
                  orderNumber: 3,
                },
                {
                  answerText: "After the crosswalk",
                  isCorrect: false,
                  orderNumber: 4,
                },
              ],
            },
            {
              question: "What must you do at a red YIELD sign?",
              explanation:
                "Slow down and be ready to stop to let any vehicle, bicyclist, or pedestrian pass before you proceed.",
              category: "traffic-signs",
              questionType: QuestionType.MULTIPLE_CHOICE,
              orderNumber: 2,
              answers: [
                {
                  answerText:
                    "Slow down and be ready to stop to let others pass",
                  isCorrect: true,
                  orderNumber: 1,
                },
                {
                  answerText: "Make a complete stop every time",
                  isCorrect: false,
                  orderNumber: 2,
                },
                {
                  answerText: "Maintain your speed and merge",
                  isCorrect: false,
                  orderNumber: 3,
                },
                {
                  answerText: "Honk to warn others",
                  isCorrect: false,
                  orderNumber: 4,
                },
              ],
            },
            {
              question:
                "A DO NOT ENTER sign means you must not enter the road or ramp where the sign is posted.",
              explanation:
                "The handbook states DO NOT ENTER means do not enter the road or ramp where the sign is posted.",
              category: "traffic-signs",
              questionType: QuestionType.TRUE_FALSE,
              orderNumber: 3,
              answers: [
                { answerText: "True", isCorrect: true, orderNumber: 1 },
                { answerText: "False", isCorrect: false, orderNumber: 2 },
              ],
            },
            {
              question:
                "At night, how can you tell you are going the wrong way on a road?",
              explanation:
                "If you are driving at night, you will know you are going the wrong way if the road reflectors shine red in your headlights.",
              category: "traffic-signs",
              questionType: QuestionType.MULTIPLE_CHOICE,
              orderNumber: 4,
              answers: [
                {
                  answerText: "Road reflectors shine red in your headlights",
                  isCorrect: true,
                  orderNumber: 1,
                },
                {
                  answerText: "Road reflectors shine green in your headlights",
                  isCorrect: false,
                  orderNumber: 2,
                },
                {
                  answerText: "The center line disappears",
                  isCorrect: false,
                  orderNumber: 3,
                },
                {
                  answerText: "Speed limit signs face away from you",
                  isCorrect: false,
                  orderNumber: 4,
                },
              ],
            },
          ],
        },
        {
          title: "Warning Signs, Railroad, and School Zone Signs",
          description:
            "Diamond-shaped warning signs, railroad crossing signs, and school zone signs.",
          estimatedDuration: 12,
          orderNumber: 2,
          blocks: [
            {
              type: ContentBlockType.HEADING,
              orderNumber: 1,
              content: { text: "Warning Signs", level: 1 },
            },
            {
              type: ContentBlockType.PARAGRAPH,
              orderNumber: 2,
              content: {
                text: "Diamond-shaped signs warn you of specific road conditions and dangers ahead. Warning signs warn of conditions related to pedestrians, bicyclists, schools, playgrounds, school buses, and school passenger loading zones.",
              },
            },
            {
              type: ContentBlockType.HEADING,
              orderNumber: 3,
              content: { text: "Railroad Crossing Signs", level: 2 },
            },
            {
              type: ContentBlockType.PARAGRAPH,
              orderNumber: 4,
              content: {
                text: "A yellow and black circular sign or X-shaped sign means you are approaching a railroad crossing. Look, listen, slow down, and prepare to stop. Let any trains pass before you proceed. Many railroad crossings also have a blue and white sign for emergencies on or near the tracks.",
              },
            },
            {
              type: ContentBlockType.HEADING,
              orderNumber: 5,
              content: { text: "School Zone Signs", level: 2 },
            },
            {
              type: ContentBlockType.PARAGRAPH,
              orderNumber: 6,
              content: {
                text: "A 5-sided sign means you are near a school. Drive slowly and stop for children in the crosswalk.",
              },
            },
            {
              type: ContentBlockType.CALLOUT,
              orderNumber: 7,
              content: {
                title: "Red Circle with a Red Line",
                text: "The picture inside the circle shows what you cannot do and may be shown with words. Hazardous load placards on trucks indicate the load may be dangerous.",
                variant: "warning",
              },
            },
          ],
          questions: [
            {
              question: "What shape are warning signs that alert you to road hazards?",
              explanation:
                "Diamond-shaped signs warn you of specific road conditions and dangers ahead.",
              category: "traffic-signs",
              questionType: QuestionType.MULTIPLE_CHOICE,
              orderNumber: 1,
              answers: [
                { answerText: "Diamond-shaped", isCorrect: true, orderNumber: 1 },
                { answerText: "Circular", isCorrect: false, orderNumber: 2 },
                { answerText: "Triangular", isCorrect: false, orderNumber: 3 },
                { answerText: "Rectangular only", isCorrect: false, orderNumber: 4 },
              ],
            },
            {
              question:
                "What should you do when you see a yellow and black circular or X-shaped railroad sign?",
              explanation:
                "Look, listen, slow down, and prepare to stop. Let any trains pass before you proceed.",
              category: "traffic-signs",
              questionType: QuestionType.MULTIPLE_CHOICE,
              orderNumber: 2,
              answers: [
                {
                  answerText: "Look, listen, slow down, and prepare to stop",
                  isCorrect: true,
                  orderNumber: 1,
                },
                {
                  answerText: "Speed up to cross before a train arrives",
                  isCorrect: false,
                  orderNumber: 2,
                },
                {
                  answerText: "Stop only if a train is visible",
                  isCorrect: false,
                  orderNumber: 3,
                },
                {
                  answerText: "Honk and proceed without slowing",
                  isCorrect: false,
                  orderNumber: 4,
                },
              ],
            },
            {
              question: "A 5-sided sign indicates you are near a school.",
              explanation:
                "The handbook states a 5-sided sign means you are near a school.",
              category: "traffic-signs",
              questionType: QuestionType.TRUE_FALSE,
              orderNumber: 3,
              answers: [
                { answerText: "True", isCorrect: true, orderNumber: 1 },
                { answerText: "False", isCorrect: false, orderNumber: 2 },
              ],
            },
            {
              question:
                "Near a school marked by a 5-sided sign, what must you do for children in the crosswalk?",
              explanation:
                "Drive slowly and stop for children in the crosswalk.",
              category: "traffic-signs",
              questionType: QuestionType.MULTIPLE_CHOICE,
              orderNumber: 4,
              answers: [
                {
                  answerText: "Drive slowly and stop for children in the crosswalk",
                  isCorrect: true,
                  orderNumber: 1,
                },
                {
                  answerText: "Honk to warn children to hurry",
                  isCorrect: false,
                  orderNumber: 2,
                },
                {
                  answerText: "Proceed at the posted highway speed",
                  isCorrect: false,
                  orderNumber: 3,
                },
                {
                  answerText: "Yield only if a crossing guard is present",
                  isCorrect: false,
                  orderNumber: 4,
                },
              ],
            },
            {
              question:
                "White rectangular signs communicate rules you must obey.",
              explanation:
                "White rectangular signs communicate many important rules you must obey.",
              category: "traffic-signs",
              questionType: QuestionType.TRUE_FALSE,
              orderNumber: 5,
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
      title: "Right-of-Way and Intersections",
      description:
        "Intersection rules, roundabouts, pedestrians, crosswalks, blind pedestrians, and mountain roads.",
      orderNumber: 3,
      lessons: [
        {
          title: "Intersection Rules and Roundabouts",
          description:
            "Who goes first at intersections and how to use a roundabout safely.",
          estimatedDuration: 14,
          orderNumber: 1,
          blocks: [
            {
              type: ContentBlockType.HEADING,
              orderNumber: 1,
              content: { text: "Right-of-Way Rules", level: 1 },
            },
            {
              type: ContentBlockType.PARAGRAPH,
              orderNumber: 2,
              content: {
                text: "Right-of-way rules help you understand who goes first when vehicles, pedestrians, and bicyclists meet on the road. The vehicle that arrives to the intersection first has the right-of-way. Never assume that other drivers will give you the right-of-way. Give up your right-of-way when it will help prevent collisions.",
              },
            },
            {
              type: ContentBlockType.HEADING,
              orderNumber: 3,
              content: { text: "Intersection Rules", level: 2 },
            },
            {
              type: ContentBlockType.CHECKLIST,
              orderNumber: 4,
              content: {
                title: "Key Intersection Rules",
                items: [
                  "Without STOP or YIELD signs: First to arrive goes first; if simultaneous, yield to the vehicle, pedestrian, or bicyclist on your right.",
                  "T intersections without signs: Traffic on the through road has the right-of-way.",
                  "Turning left: Give the right-of-way to any pedestrian or approaching vehicle close enough to be dangerous.",
                  "Green light: Proceed with caution. Pedestrians have the right-of-way.",
                  "Do not block an intersection if you cannot completely cross before the light turns red.",
                ],
              },
            },
            {
              type: ContentBlockType.HEADING,
              orderNumber: 5,
              content: { text: "How to Use a Roundabout", level: 2 },
            },
            {
              type: ContentBlockType.CHECKLIST,
              orderNumber: 6,
              content: {
                title: "7 Steps for Roundabouts",
                items: [
                  "1. Slow down as you approach.",
                  "2. Yield to all traffic already in the roundabout.",
                  "3. Enter heading to the right when there is a big enough gap to merge safely.",
                  "4. Watch for signs and lane markings that guide you.",
                  "5. Travel in a counter-clockwise direction. Do not stop or pass.",
                  "6. Signal when you change lanes or exit.",
                  "7. If you miss your exit, continue around until you return to your exit.",
                ],
              },
            },
            {
              type: ContentBlockType.CALLOUT,
              orderNumber: 7,
              content: {
                title: "Multiple-Lane Roundabouts",
                text: "To turn right, choose the right lane and exit in the right lane. To go straight, choose either lane and exit in the lane you entered. To turn left, enter and continue until you reach your exit.",
                variant: "tip",
              },
            },
          ],
          questions: [
            {
              question:
                "At an intersection without STOP or YIELD signs, who has the right-of-way if two vehicles arrive at the same time?",
              explanation:
                "Give the right-of-way to the vehicle, pedestrian, or bicyclist on your right.",
              category: "right-of-way",
              questionType: QuestionType.MULTIPLE_CHOICE,
              orderNumber: 1,
              answers: [
                {
                  answerText: "The vehicle on your right",
                  isCorrect: true,
                  orderNumber: 1,
                },
                {
                  answerText: "The vehicle on your left",
                  isCorrect: false,
                  orderNumber: 2,
                },
                {
                  answerText: "The larger vehicle",
                  isCorrect: false,
                  orderNumber: 3,
                },
                {
                  answerText: "The faster vehicle",
                  isCorrect: false,
                  orderNumber: 4,
                },
              ],
            },
            {
              question:
                "At a T intersection without STOP or YIELD signs, who has the right-of-way?",
              explanation:
                "Vehicles, bicyclists, and pedestrians on the through road (continuing straight) have the right-of-way.",
              category: "right-of-way",
              questionType: QuestionType.MULTIPLE_CHOICE,
              orderNumber: 2,
              answers: [
                {
                  answerText: "Traffic on the through road",
                  isCorrect: true,
                  orderNumber: 1,
                },
                {
                  answerText: "Traffic on the terminating road",
                  isCorrect: false,
                  orderNumber: 2,
                },
                {
                  answerText: "The vehicle turning left",
                  isCorrect: false,
                  orderNumber: 3,
                },
                {
                  answerText: "The vehicle turning right",
                  isCorrect: false,
                  orderNumber: 4,
                },
              ],
            },
            {
              question:
                "In a roundabout, traffic travels in a counter-clockwise direction.",
              explanation:
                "The handbook states to travel in a counter-clockwise direction in a roundabout.",
              category: "right-of-way",
              questionType: QuestionType.TRUE_FALSE,
              orderNumber: 3,
              answers: [
                { answerText: "True", isCorrect: true, orderNumber: 1 },
                { answerText: "False", isCorrect: false, orderNumber: 2 },
              ],
            },
            {
              question:
                "What should you do if you miss your exit in a roundabout?",
              explanation:
                "If you miss your exit, continue around until you return to your exit.",
              category: "right-of-way",
              questionType: QuestionType.MULTIPLE_CHOICE,
              orderNumber: 4,
              answers: [
                {
                  answerText: "Continue around until you return to your exit",
                  isCorrect: true,
                  orderNumber: 1,
                },
                {
                  answerText: "Stop and back up to the exit",
                  isCorrect: false,
                  orderNumber: 2,
                },
                {
                  answerText: "Cut across the center island",
                  isCorrect: false,
                  orderNumber: 3,
                },
                {
                  answerText: "Exit immediately in any direction",
                  isCorrect: false,
                  orderNumber: 4,
                },
              ],
            },
            {
              question:
                "You should always assume other drivers will give you the right-of-way.",
              explanation:
                "Never assume that other drivers will give you the right-of-way.",
              category: "right-of-way",
              questionType: QuestionType.TRUE_FALSE,
              orderNumber: 5,
              answers: [
                { answerText: "True", isCorrect: false, orderNumber: 1 },
                { answerText: "False", isCorrect: true, orderNumber: 2 },
              ],
            },
          ],
        },
        {
          title: "Pedestrians, Crosswalks, and Special Situations",
          description:
            "Pedestrian right-of-way, crosswalks, blind pedestrians, and mountain road rules.",
          estimatedDuration: 14,
          orderNumber: 2,
          blocks: [
            {
              type: ContentBlockType.HEADING,
              orderNumber: 1,
              content: { text: "Pedestrians and Crosswalks", level: 1 },
            },
            {
              type: ContentBlockType.PARAGRAPH,
              orderNumber: 2,
              content: {
                text: "Pedestrians always have the right-of-way. When a pedestrian is crossing a roadway with or without a crosswalk, you must use caution, reduce your speed, or stop to allow the pedestrian to safely finish crossing. Do not pass a vehicle stopped at a crosswalk.",
              },
            },
            {
              type: ContentBlockType.CHECKLIST,
              orderNumber: 3,
              content: {
                title: "Crosswalk Rules",
                items: [
                  "Crosswalks are often marked with white lines; school crossings may have yellow lines.",
                  "Not all crosswalks are marked. Pedestrians have the right-of-way in marked or unmarked crosswalks.",
                  "Stop at the limit line before the crosswalk and allow pedestrians to cross.",
                  "Some crosswalks have flashing lights. Look for pedestrians and be prepared to stop whether or not lights are flashing.",
                ],
              },
            },
            {
              type: ContentBlockType.HEADING,
              orderNumber: 4,
              content: { text: "Pedestrians Who Are Blind", level: 2 },
            },
            {
              type: ContentBlockType.CHECKLIST,
              orderNumber: 5,
              content: {
                title: "Blind Pedestrian Rules",
                items: [
                  "Pedestrians using guide dogs or white canes have the right-of-way at all times.",
                  "Do not stop in the middle of a crosswalk.",
                  "Do not honk your horn at a blind person.",
                  "When a blind person pulls in their cane and steps away, this usually means you may go.",
                  "Blind pedestrians rely on sound; be extra careful in hybrid or electric vehicles.",
                ],
              },
            },
            {
              type: ContentBlockType.HEADING,
              orderNumber: 6,
              content: { text: "Mountain Roads", level: 2 },
            },
            {
              type: ContentBlockType.PARAGRAPH,
              orderNumber: 7,
              content: {
                text: "If two vehicles meet on a steep narrow road and neither vehicle can pass, the vehicle facing uphill has the right-of-way. The vehicle facing downhill has more control when backing up the hill and should back up until the vehicle going uphill can pass.",
              },
            },
          ],
          questions: [
            {
              question:
                "Do pedestrians have the right-of-way in unmarked crosswalks?",
              explanation:
                "Pedestrians have the right-of-way in marked or unmarked crosswalks.",
              category: "right-of-way",
              questionType: QuestionType.TRUE_FALSE,
              orderNumber: 1,
              answers: [
                { answerText: "True", isCorrect: true, orderNumber: 1 },
                { answerText: "False", isCorrect: false, orderNumber: 2 },
              ],
            },
            {
              question:
                "Why should you not pass a vehicle stopped at a crosswalk?",
              explanation:
                "You may not be able to see a pedestrian crossing the street.",
              category: "right-of-way",
              questionType: QuestionType.MULTIPLE_CHOICE,
              orderNumber: 2,
              answers: [
                {
                  answerText:
                    "You may not be able to see a pedestrian crossing the street",
                  isCorrect: true,
                  orderNumber: 1,
                },
                {
                  answerText: "It is illegal to pass any stopped vehicle",
                  isCorrect: false,
                  orderNumber: 2,
                },
                {
                  answerText: "The stopped vehicle has the right-of-way",
                  isCorrect: false,
                  orderNumber: 3,
                },
                {
                  answerText: "Crosswalks are always marked with lights",
                  isCorrect: false,
                  orderNumber: 4,
                },
              ],
            },
            {
              question:
                "Pedestrians using guide dogs or white canes have the right-of-way at all times.",
              explanation:
                "The handbook states these pedestrians have the right-of-way at all times.",
              category: "right-of-way",
              questionType: QuestionType.TRUE_FALSE,
              orderNumber: 3,
              answers: [
                { answerText: "True", isCorrect: true, orderNumber: 1 },
                { answerText: "False", isCorrect: false, orderNumber: 2 },
              ],
            },
            {
              question:
                "On a steep narrow mountain road, which vehicle should back up when neither can pass?",
              explanation:
                "The vehicle facing downhill should back up until the vehicle going uphill can pass.",
              category: "right-of-way",
              questionType: QuestionType.MULTIPLE_CHOICE,
              orderNumber: 4,
              answers: [
                {
                  answerText: "The vehicle facing downhill",
                  isCorrect: true,
                  orderNumber: 1,
                },
                {
                  answerText: "The vehicle facing uphill",
                  isCorrect: false,
                  orderNumber: 2,
                },
                {
                  answerText: "The smaller vehicle",
                  isCorrect: false,
                  orderNumber: 3,
                },
                {
                  answerText: "Neither; both must wait for help",
                  isCorrect: false,
                  orderNumber: 4,
                },
              ],
            },
            {
              question:
                "Should you honk your horn at a blind pedestrian to let them know you are waiting?",
              explanation:
                "Do not honk your horn at a blind person.",
              category: "right-of-way",
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
    {
      title: "Sharing the Road and Speed Limits",
      description:
        "Trucks, motorcycles, emergency vehicles, bicycles, and California speed limits.",
      orderNumber: 4,
      lessons: [
        {
          title: "Sharing the Road with Others",
          description:
            "Blind spots, motorcycles, emergency vehicles, and bicycle passing rules.",
          estimatedDuration: 16,
          orderNumber: 1,
          blocks: [
            {
              type: ContentBlockType.HEADING,
              orderNumber: 1,
              content: { text: "Large Vehicles and Blind Spots", level: 1 },
            },
            {
              type: ContentBlockType.PARAGRAPH,
              orderNumber: 2,
              content: {
                text: "Large vehicle and truck drivers have large blind spots, also called No Zones. If you cannot see the truck's side mirrors, the truck driver cannot see you. A passenger vehicle at 55 mph can stop within 300 feet; a large vehicle may need up to 400 feet.",
              },
            },
            {
              type: ContentBlockType.HEADING,
              orderNumber: 3,
              content: { text: "Motorcycles", level: 2 },
            },
            {
              type: ContentBlockType.CHECKLIST,
              orderNumber: 4,
              content: {
                title: "Sharing the Road with Motorcyclists",
                items: [
                  "Check for motorcycles; they easily disappear in blind spots.",
                  "Allow a safe three-second following distance.",
                  "Whenever possible, give a motorcycle the full lane.",
                  "Never try to pass a motorcycle in the same lane.",
                  "Check for motorcyclists before opening your door.",
                ],
              },
            },
            {
              type: ContentBlockType.HEADING,
              orderNumber: 5,
              content: { text: "Emergency Vehicles", level: 2 },
            },
            {
              type: ContentBlockType.PARAGRAPH,
              orderNumber: 6,
              content: {
                text: "Give the right-of-way to any law enforcement vehicle, fire engine, ambulance, or other emergency vehicle using a siren and red lights. Drive to the right edge of the road and stop until they have passed. It is against the law to follow within 300 feet of any emergency vehicle when their siren or flashing lights are on.",
              },
            },
            {
              type: ContentBlockType.CALLOUT,
              orderNumber: 7,
              content: {
                title: "Bicycles — 3-Foot Passing Rule",
                text: "When you cannot change lanes to pass a bicyclist, allow at least three feet between your vehicle and the bicyclist. If you cannot give three feet of space, do not pass until three feet of clearance can be given.",
                variant: "warning",
              },
            },
          ],
          questions: [
            {
              question:
                "How can you tell if a truck driver can see your vehicle?",
              explanation:
                "If you cannot see the truck's side mirrors, the truck driver cannot see you.",
              category: "sharing-road",
              questionType: QuestionType.MULTIPLE_CHOICE,
              orderNumber: 1,
              answers: [
                {
                  answerText: "You can see the truck's side mirrors",
                  isCorrect: true,
                  orderNumber: 1,
                },
                {
                  answerText: "You are within 100 feet of the truck",
                  isCorrect: false,
                  orderNumber: 2,
                },
                {
                  answerText: "You are in the lane next to the truck",
                  isCorrect: false,
                  orderNumber: 3,
                },
                {
                  answerText: "Your headlights are on",
                  isCorrect: false,
                  orderNumber: 4,
                },
              ],
            },
            {
              question:
                "What following distance should you allow behind a motorcycle?",
              explanation:
                "Allow a safe three-second following distance to avoid hitting a motorcyclist if they brake suddenly or fall.",
              category: "sharing-road",
              questionType: QuestionType.MULTIPLE_CHOICE,
              orderNumber: 2,
              answers: [
                {
                  answerText: "A safe three-second following distance",
                  isCorrect: true,
                  orderNumber: 1,
                },
                {
                  answerText: "One second",
                  isCorrect: false,
                  orderNumber: 2,
                },
                {
                  answerText: "Five car lengths exactly",
                  isCorrect: false,
                  orderNumber: 3,
                },
                {
                  answerText: "Ten seconds",
                  isCorrect: false,
                  orderNumber: 4,
                },
              ],
            },
            {
              question:
                "It is against the law to follow within 300 feet of an emergency vehicle with siren and flashing lights on.",
              explanation:
                "The handbook states it is against the law to follow within 300 feet under these conditions.",
              category: "sharing-road",
              questionType: QuestionType.TRUE_FALSE,
              orderNumber: 3,
              answers: [
                { answerText: "True", isCorrect: true, orderNumber: 1 },
                { answerText: "False", isCorrect: false, orderNumber: 2 },
              ],
            },
            {
              question:
                "What must you do when an emergency vehicle with siren and red lights approaches?",
              explanation:
                "Drive to the right edge of the road and stop until the emergency vehicle(s) have passed.",
              category: "sharing-road",
              questionType: QuestionType.MULTIPLE_CHOICE,
              orderNumber: 4,
              answers: [
                {
                  answerText:
                    "Drive to the right edge of the road and stop until they pass",
                  isCorrect: true,
                  orderNumber: 1,
                },
                {
                  answerText: "Speed up to get out of the way",
                  isCorrect: false,
                  orderNumber: 2,
                },
                {
                  answerText: "Stop in the middle of your lane",
                  isCorrect: false,
                  orderNumber: 3,
                },
                {
                  answerText: "Move to the left lane",
                  isCorrect: false,
                  orderNumber: 4,
                },
              ],
            },
            {
              question:
                "When passing a bicyclist in the same lane, you must allow at least how much space?",
              explanation:
                "Allow at least three feet between your vehicle and the bicyclist.",
              category: "sharing-road",
              questionType: QuestionType.MULTIPLE_CHOICE,
              orderNumber: 5,
              answers: [
                { answerText: "Three feet", isCorrect: true, orderNumber: 1 },
                { answerText: "One foot", isCorrect: false, orderNumber: 2 },
                { answerText: "Six inches", isCorrect: false, orderNumber: 3 },
                { answerText: "Ten feet", isCorrect: false, orderNumber: 4 },
              ],
            },
          ],
        },
        {
          title: "Speed Limits and School Bus Rules",
          description:
            "School zones, blind intersections, alleys, railroad crossings, and school bus red light rules.",
          estimatedDuration: 14,
          orderNumber: 2,
          blocks: [
            {
              type: ContentBlockType.HEADING,
              orderNumber: 1,
              content: { text: "Speed Limits Near Schools and Special Areas", level: 1 },
            },
            {
              type: ContentBlockType.CHECKLIST,
              orderNumber: 2,
              content: {
                title: "California Speed Limits",
                items: [
                  "School zones: 25 mph within 500 feet of a school while children are outside or crossing. Some zones may be as low as 15 mph.",
                  "Blind intersections: 15 mph when your view is blocked.",
                  "Alleys: 15 mph (roads no wider than 25 feet used to access rear or side entrances).",
                  "Railroad crossings: 15 mph within 100 feet when you cannot see tracks for 400 feet in both directions (unless controlled by gates, signals, or flagman).",
                  "Business or residential districts: 25 mph unless otherwise posted.",
                ],
              },
            },
            {
              type: ContentBlockType.HEADING,
              orderNumber: 3,
              content: { text: "School Bus Rules", level: 2 },
            },
            {
              type: ContentBlockType.PARAGRAPH,
              orderNumber: 4,
              content: {
                text: "Some school buses flash yellow lights when preparing to stop. Yellow flashing lights warn you to slow down and prepare to stop. When the bus flashes red lights, you must stop from either direction until the children are safely across the street and the lights stop flashing.",
              },
            },
            {
              type: ContentBlockType.CALLOUT,
              orderNumber: 5,
              content: {
                title: "School Bus Penalties",
                text: "If you fail to stop for a school bus with flashing red lights, you may be fined up to $1,000 and your driving privilege could be suspended for one year. If the bus is on the other side of a divided or multilane highway, you do not need to stop.",
                variant: "warning",
              },
            },
            {
              type: ContentBlockType.HEADING,
              orderNumber: 6,
              content: { text: "Near Schools", level: 2 },
            },
            {
              type: ContentBlockType.CHECKLIST,
              orderNumber: 7,
              content: {
                title: "Watch for Near Schools",
                items: [
                  "Bicyclists and pedestrians.",
                  "School safety patrols or crossing guards — obey their directions at all times.",
                  "Stopped school buses and children crossing the street.",
                ],
              },
            },
          ],
          questions: [
            {
              question:
                "What is the speed limit within 500 feet of a school while children are outside or crossing?",
              explanation:
                "The speed limit is 25 mph within 500 feet of a school while children are outside or crossing the street.",
              category: "speed-limits",
              questionType: QuestionType.MULTIPLE_CHOICE,
              orderNumber: 1,
              answers: [
                { answerText: "25 mph", isCorrect: true, orderNumber: 1 },
                { answerText: "15 mph", isCorrect: false, orderNumber: 2 },
                { answerText: "35 mph", isCorrect: false, orderNumber: 3 },
                { answerText: "20 mph", isCorrect: false, orderNumber: 4 },
              ],
            },
            {
              question: "What is the speed limit for a blind intersection?",
              explanation:
                "The speed limit for a blind intersection is 15 mph.",
              category: "speed-limits",
              questionType: QuestionType.MULTIPLE_CHOICE,
              orderNumber: 2,
              answers: [
                { answerText: "15 mph", isCorrect: true, orderNumber: 1 },
                { answerText: "25 mph", isCorrect: false, orderNumber: 2 },
                { answerText: "20 mph", isCorrect: false, orderNumber: 3 },
                { answerText: "10 mph", isCorrect: false, orderNumber: 4 },
              ],
            },
            {
              question:
                "The speed limit is 15 mph within 100 feet of a railroad crossing when you cannot see the tracks for 400 feet in both directions.",
              explanation:
                "The handbook states this 15 mph limit applies unless the crossing is controlled by gates, a warning signal, or a flagman.",
              category: "speed-limits",
              questionType: QuestionType.TRUE_FALSE,
              orderNumber: 3,
              answers: [
                { answerText: "True", isCorrect: true, orderNumber: 1 },
                { answerText: "False", isCorrect: false, orderNumber: 2 },
              ],
            },
            {
              question:
                "When a school bus flashes red lights, what must you do?",
              explanation:
                "You must stop from either direction until the children are safely across and the lights stop flashing.",
              category: "speed-limits",
              questionType: QuestionType.MULTIPLE_CHOICE,
              orderNumber: 4,
              answers: [
                {
                  answerText:
                    "Stop from either direction until children are safely across and lights stop flashing",
                  isCorrect: true,
                  orderNumber: 1,
                },
                {
                  answerText: "Slow down and pass carefully",
                  isCorrect: false,
                  orderNumber: 2,
                },
                {
                  answerText: "Stop only if you are behind the bus",
                  isCorrect: false,
                  orderNumber: 3,
                },
                {
                  answerText: "Honk and proceed if no children are visible",
                  isCorrect: false,
                  orderNumber: 4,
                },
              ],
            },
            {
              question:
                "You must always stop for a school bus with flashing red lights, even on a divided multilane highway.",
              explanation:
                "If the school bus is on the other side of a divided or multilane highway (two or more lanes in each direction), you do not need to stop.",
              category: "speed-limits",
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
