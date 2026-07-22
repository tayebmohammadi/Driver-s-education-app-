export interface QnaPracticeQuestion {
  id: string;
  question: string;
  explanation: string;
  category: string;
  imageUrl: string | null;
  answers: { id: string; text: string; isCorrect: boolean }[];
}

export const CLASS_C_WRITTEN_TEST_1: QnaPracticeQuestion[] = [
  {
    id: "class-c-1",
    question: "When is it legal to drive off the road to pass another vehicle?",
    explanation:
      "In California, you must pass on the left within your lane or a legal passing lane. Driving off the paved roadway to pass is never legal.",
    category: "rules-of-the-road",
    imageUrl: null,
    answers: [
      { id: "class-c-1-a", text: "If the vehicle ahead is turning left.", isCorrect: false },
      { id: "class-c-1-b", text: "It is not legal under any conditions.", isCorrect: true },
      { id: "class-c-1-c", text: "If there are two or more one-way lanes.", isCorrect: false },
    ],
  },
  {
    id: "class-c-2",
    question:
      "When a railroad crossing is not controlled, what is the speed limit when you are within 100 feet and cannot see for 400 feet in both directions?",
    explanation:
      "At uncontrolled railroad crossings with limited visibility, California law limits your speed to 15 mph so you can stop safely if a train is approaching.",
    category: "rules-of-the-road",
    imageUrl: null,
    answers: [
      { id: "class-c-2-a", text: "15 mph.", isCorrect: true },
      { id: "class-c-2-b", text: "10 mph.", isCorrect: false },
      { id: "class-c-2-c", text: "25 mph.", isCorrect: false },
    ],
  },
  {
    id: "class-c-3",
    question: "Which of the following is the proper procedure for parallel parking?",
    explanation:
      "Pull alongside the vehicle in front of the space, signal, check mirrors and blind spots, then back slowly into the space while steering into position.",
    category: "parking",
    imageUrl: null,
    answers: [
      { id: "class-c-3-a", text: "Drive forward into the space without stopping.", isCorrect: false },
      {
        id: "class-c-3-b",
        text: "Stop next to the vehicle behind the open space, and then drive forward into the space.",
        isCorrect: false,
      },
      {
        id: "class-c-3-c",
        text: "Stop next to the vehicle in front of the open space, and then back into the space.",
        isCorrect: true,
      },
    ],
  },
  {
    id: "class-c-4",
    question: "What speed should you be driving when entering onto a highway?",
    explanation:
      "Use the acceleration lane to match the speed of traffic already on the freeway so you can merge smoothly and safely.",
    category: "freeway-driving",
    imageUrl: null,
    answers: [
      { id: "class-c-4-a", text: "At or near the speed of traffic.", isCorrect: true },
      { id: "class-c-4-b", text: "Faster than the speed of traffic.", isCorrect: false },
      { id: "class-c-4-c", text: "Slower than the speed of traffic.", isCorrect: false },
    ],
  },
  {
    id: "class-c-5",
    question:
      "How many feet away should you switch from high beam to low beam headlights when approaching a vehicle coming towards you?",
    explanation:
      "California law requires you to dim high beams within 500 feet of an oncoming vehicle to avoid blinding the other driver.",
    category: "night-driving",
    imageUrl: null,
    answers: [
      { id: "class-c-5-a", text: "900 feet.", isCorrect: false },
      { id: "class-c-5-b", text: "700 feet.", isCorrect: false },
      { id: "class-c-5-c", text: "500 feet.", isCorrect: true },
    ],
  },
  {
    id: "class-c-6",
    question: "Who can legally park next to curb painted blue?",
    explanation:
      "Blue curbs are reserved for disabled persons displaying a valid disabled placard or special license plate, unless local rules say otherwise.",
    category: "parking",
    imageUrl: null,
    answers: [
      {
        id: "class-c-6-a",
        text: "Someone who is either picking up or dropping off passengers at this location.",
        isCorrect: false,
      },
      {
        id: "class-c-6-b",
        text: "A person who is disabled and has a special placard or vehicle license plate for disabled persons.",
        isCorrect: true,
      },
      {
        id: "class-c-6-c",
        text: "A person who will only be parked at the curb for less than 15 minutes.",
        isCorrect: false,
      },
    ],
  },
  {
    id: "class-c-7",
    question:
      "What should you do when there is a school bus ahead that starts flashing yellow warning lights?",
    explanation:
      "Yellow flashing lights on a school bus mean the bus is preparing to stop. Slow down, watch for children, and be ready to stop when red lights flash.",
    category: "sharing-road",
    imageUrl: null,
    answers: [
      { id: "class-c-7-a", text: "Slow down and prepare to stop.", isCorrect: true },
      { id: "class-c-7-b", text: "Stop immediately and remain stopped.", isCorrect: false },
      { id: "class-c-7-c", text: "Cautiously pass the school bus on the left.", isCorrect: false },
    ],
  },
  {
    id: "class-c-8",
    question: "Which of the following is a requirement of California's Basic Speed Law?",
    explanation:
      "The Basic Speed Law means you must never drive faster than is safe for current conditions — even if the posted limit is higher.",
    category: "rules-of-the-road",
    imageUrl: null,
    answers: [
      { id: "class-c-8-a", text: "Always drive the speed limit, regardless of conditions.", isCorrect: false },
      { id: "class-c-8-b", text: "Match your speed to that of your surrounding traffic.", isCorrect: false },
      { id: "class-c-8-c", text: "Never drive faster than is safe for current conditions.", isCorrect: true },
    ],
  },
  {
    id: "class-c-9",
    question: "You must notify the DMV within 5 days, if you:",
    explanation:
      "When you sell or transfer ownership of a vehicle, you must notify DMV within five days by submitting a Notice of Transfer and Release of Liability.",
    category: "licensing",
    imageUrl: null,
    answers: [
      { id: "class-c-9-a", text: "Paint your vehicle a different color.", isCorrect: false },
      { id: "class-c-9-b", text: "Sell or transfer ownership of your vehicle.", isCorrect: true },
      { id: "class-c-9-c", text: "Receive a traffic violation.", isCorrect: false },
    ],
  },
  {
    id: "class-c-10",
    question: "Which of the following is an example of a safe driving practice?",
    explanation:
      "Good drivers keep their eyes moving — scanning mirrors, the road ahead, and surroundings — instead of staring at one fixed spot.",
    category: "defensive-driving",
    imageUrl: null,
    answers: [
      { id: "class-c-10-a", text: "Staring only at the middle of the road.", isCorrect: false },
      { id: "class-c-10-b", text: "Always keep your eyes moving to scan the surroundings.", isCorrect: true },
      { id: "class-c-10-c", text: "Using your high-beam headlights in the fog", isCorrect: false },
    ],
  },
];

export const CLASS_C_WRITTEN_TEST_2: QnaPracticeQuestion[] = [
  {
    id: "class-c-2-1",
    question:
      "What should you do when reaching an intersection where a person operating a motorized wheelchair has entered the crosswalk?",
    explanation:
      "Stay stopped behind the crosswalk line until the person in the motorized wheelchair has crossed safely and is beyond the path of your vehicle.",
    category: "right-of-way",
    imageUrl: null,
    answers: [
      {
        id: "class-c-2-1-a",
        text: "Remain stopped behind the crosswalk line until the motorized wheelchair has safely finished crossing.",
        isCorrect: false,
      },
      {
        id: "class-c-2-1-b",
        text: "Remain stopped behind the nearest crosswalk line until the motorized wheelchair is beyond the range of your vehicle.",
        isCorrect: true,
      },
      {
        id: "class-c-2-1-c",
        text: "Assume right-of-way if the motorized wheelchair stops in the crosswalk.",
        isCorrect: false,
      },
    ],
  },
  {
    id: "class-c-2-2",
    question: "Which of the following is true about large trucks?",
    explanation:
      "Large trucks have big blind spots (No Zones) on the sides, front, and rear where the driver may not see your vehicle.",
    category: "sharing-road",
    imageUrl: null,
    answers: [
      {
        id: "class-c-2-2-a",
        text: "They are made of many trailers, which make them more maneuverable than passenger vehicles.",
        isCorrect: false,
      },
      {
        id: "class-c-2-2-b",
        text: "They have large blind spots, which makes it difficult for the truck driver to see other vehicles.",
        isCorrect: true,
      },
      {
        id: "class-c-2-2-c",
        text: "They have large and powerful emergency brakes, which gives them the capability to stop quickly.",
        isCorrect: false,
      },
    ],
  },
  {
    id: "class-c-2-3",
    question: "What is one of the most common causes of traffic collisions?",
    explanation:
      "Driver distractions — phones, eating, adjusting controls, or anything that takes attention off driving — are a leading cause of crashes.",
    category: "distracted-driving",
    imageUrl: null,
    answers: [
      { id: "class-c-2-3-a", text: "Paying attention to your surroundings.", isCorrect: false },
      { id: "class-c-2-3-b", text: "Better traffic flow.", isCorrect: false },
      { id: "class-c-2-3-c", text: "Driver distractions.", isCorrect: true },
    ],
  },
  {
    id: "class-c-2-4",
    question:
      "Any driver who willfully flees or attempts to evade law enforcement, during which a person is seriously injured, is subject to:",
    explanation:
      "Evading police and causing serious injury is a serious felony in California and can result in imprisonment in state prison for up to seven years.",
    category: "rules-of-the-road",
    imageUrl: null,
    answers: [
      {
        id: "class-c-2-4-a",
        text: "Imprisonment in a state prison for up to seven years.",
        isCorrect: true,
      },
      { id: "class-c-2-4-b", text: "A fine of less than $1,000.", isCorrect: false },
      { id: "class-c-2-4-c", text: "Attending an anger-management class.", isCorrect: false },
    ],
  },
  {
    id: "class-c-2-5",
    question:
      "What should a driver do who is stopped at an intersection and wants to make a left turn?",
    explanation:
      "Before turning left, yield to oncoming traffic and pedestrians that are close enough to be a hazard. Turn only when it is safe.",
    category: "right-of-way",
    imageUrl: null,
    answers: [
      { id: "class-c-2-5-a", text: "Turn immediately if there are no pedestrians.", isCorrect: false },
      { id: "class-c-2-5-b", text: "Take the right-of-way turn before oncoming traffic.", isCorrect: false },
      {
        id: "class-c-2-5-c",
        text: "Give the right-of-way to any approaching vehicle that is close enough to be dangerous.",
        isCorrect: true,
      },
    ],
  },
  {
    id: "class-c-2-6",
    question:
      "In addition to setting your parking brake, what should you do when parking on a hill?",
    explanation:
      "Set the parking brake and leave the vehicle in Park (automatic) or in gear (manual) so it cannot roll.",
    category: "parking",
    imageUrl: null,
    answers: [
      {
        id: "class-c-2-6-a",
        text: "Make sure the front vehicle wheels are parallel to the road.",
        isCorrect: false,
      },
      { id: "class-c-2-6-b", text: 'Make sure your vehicle is left in the "neutral" position.', isCorrect: false },
      {
        id: "class-c-2-6-c",
        text: 'Make sure your vehicle is in the "park" position or in gear.',
        isCorrect: true,
      },
    ],
  },
  {
    id: "class-c-2-7",
    question:
      "You are under 18 years of age and have had your license for eight months. You may drive:",
    explanation:
      "Provisional drivers under 18 generally may drive between 5 a.m. and 11 p.m. during the first 12 months unless driving for an approved work/school reason with proper documentation.",
    category: "licensing",
    imageUrl: null,
    answers: [
      { id: "class-c-2-7-a", text: "At any time.", isCorrect: false },
      { id: "class-c-2-7-b", text: "Between 5 a.m. and 11 p.m.", isCorrect: true },
      { id: "class-c-2-7-c", text: "Between 7 a.m. and 8 p.m.", isCorrect: false },
    ],
  },
  {
    id: "class-c-2-8",
    question:
      "Where should you begin a left turn from a one-way street onto a one-way street?",
    explanation:
      "Start your left turn from the far-left lane and enter the far-left lane of the one-way street you are turning onto.",
    category: "rules-of-the-road",
    imageUrl: null,
    answers: [
      { id: "class-c-2-8-a", text: "The lane closest to the center of the street.", isCorrect: false },
      { id: "class-c-2-8-b", text: "The far-left lane.", isCorrect: true },
      { id: "class-c-2-8-c", text: "You can turn from any lane.", isCorrect: false },
    ],
  },
  {
    id: "class-c-2-9",
    question:
      "You are required to notify DMV by filing a Report of Traffic Accident Occuring in California (SR-1) form if:",
    explanation:
      "You must file an SR-1 with DMV within 10 days if the collision caused injury, death, or property damage over $1,000.",
    category: "licensing",
    imageUrl: null,
    answers: [
      {
        id: "class-c-2-9-a",
        text: "You allowed a licensed driver from another state to drive your vehicle.",
        isCorrect: false,
      },
      {
        id: "class-c-2-9-b",
        text: "You were involved in a collision with more than $1,000 in damages.",
        isCorrect: true,
      },
      { id: "class-c-2-9-c", text: "You failed to pay your registration fees.", isCorrect: false },
    ],
  },
  {
    id: "class-c-2-10",
    question: "At what point during a rainfall are roads slippery on a hot day?",
    explanation:
      "On hot days, oil and dust on the road surface make pavement especially slippery during the first few minutes of rain before the surface is washed clean.",
    category: "weather-conditions",
    imageUrl: null,
    answers: [
      { id: "class-c-2-10-a", text: "Immediately after it has stopped raining.", isCorrect: false },
      { id: "class-c-2-10-b", text: "For the first several minutes.", isCorrect: true },
      { id: "class-c-2-10-c", text: "When it has been raining for a few hours.", isCorrect: false },
    ],
  },
];

export const CLASS_C_WRITTEN_TEST_3: QnaPracticeQuestion[] = [
  {
    id: "class-c-3-1",
    question: "What color curb does not allow vehicles to stop or park?",
    explanation:
      "A red curb means no stopping, standing, or parking at any time unless you are in a bus zone marked for that purpose.",
    category: "parking",
    imageUrl: null,
    answers: [
      { id: "class-c-3-1-a", text: "Yellow.", isCorrect: false },
      { id: "class-c-3-1-b", text: "Red.", isCorrect: true },
      { id: "class-c-3-1-c", text: "White.", isCorrect: false },
    ],
  },
  {
    id: "class-c-3-2",
    question:
      "You are required to notify DMV by filing a Report of Traffic Accident Occuring in California (SR-1) form if:",
    explanation:
      "An SR-1 must be filed when a collision causes injury, death, or property damage over $1,000.",
    category: "licensing",
    imageUrl: null,
    answers: [
      { id: "class-c-3-2-a", text: "You change your insurance company.", isCorrect: false },
      {
        id: "class-c-3-2-b",
        text: "You were involved in a collision with an injury.",
        isCorrect: true,
      },
      { id: "class-c-3-2-c", text: "Your vehicle fails a smog test.", isCorrect: false },
    ],
  },
  {
    id: "class-c-3-3",
    question:
      "What is indicated by two sets of double yellow lines spaced 2 feet or more apart?",
    explanation:
      "Two sets of double yellow lines spaced two or more feet apart act as a barrier. Do not drive on or over them.",
    category: "rules-of-the-road",
    imageUrl: null,
    answers: [
      { id: "class-c-3-3-a", text: "Lanes of traffic moving in the same direction.", isCorrect: false },
      { id: "class-c-3-3-b", text: "Barrier.", isCorrect: true },
      { id: "class-c-3-3-c", text: "Carpool/High-Occupancy (HOV) lane.", isCorrect: false },
    ],
  },
  {
    id: "class-c-3-4",
    question: "What should you do to make a right turn at an upcoming intersection?",
    explanation:
      "In California, you may drive into a bicycle lane within 200 feet of the intersection to make a right turn after checking for bicyclists.",
    category: "rules-of-the-road",
    imageUrl: null,
    answers: [
      {
        id: "class-c-3-4-a",
        text: "Merge into the bicycle lane before making the turn.",
        isCorrect: true,
      },
      {
        id: "class-c-3-4-b",
        text: "Wait until the bicycle lane ends, then make the turn.",
        isCorrect: false,
      },
      {
        id: "class-c-3-4-c",
        text: "Make the turn from your current lane and do not enter the bicycle lane.",
        isCorrect: false,
      },
    ],
  },
  {
    id: "class-c-3-5",
    question: "A highway has a posted speed limit of 65 mph. What does this mean?",
    explanation:
      "The posted limit is the maximum speed under ideal conditions. You must slow down when weather, traffic, or road conditions are not ideal.",
    category: "speed-limits",
    imageUrl: null,
    answers: [
      { id: "class-c-3-5-a", text: "You must always drive 65 mph on that highway.", isCorrect: false },
      {
        id: "class-c-3-5-b",
        text: "You may drive faster only if there are no other vehicles.",
        isCorrect: false,
      },
      {
        id: "class-c-3-5-c",
        text: "You must drive 65 mph only if driving conditions are ideal.",
        isCorrect: true,
      },
    ],
  },
  {
    id: "class-c-3-6",
    question: "When is parking in a crosshatched (diagonal lines) area allowed?",
    explanation:
      "Crosshatched areas next to disabled parking spaces are not parking spaces. Never park in a crosshatched area.",
    category: "parking",
    imageUrl: null,
    answers: [
      {
        id: "class-c-3-6-a",
        text: "It is never allowed to park in a crosshatched (diagonal lines) area.",
        isCorrect: true,
      },
      {
        id: "class-c-3-6-b",
        text: "If the area is at least twenty feet away from a railroad track.",
        isCorrect: false,
      },
      {
        id: "class-c-3-6-c",
        text: "If the area is labeled as a bicycle lane, unless otherwise posted.",
        isCorrect: false,
      },
    ],
  },
  {
    id: "class-c-3-7",
    question:
      "What should you do if your cell phone rings and you do not have a hands-free device?",
    explanation:
      "It is illegal to hold and use a phone while driving. Let it go to voicemail and return the call when you are safely parked.",
    category: "distracted-driving",
    imageUrl: null,
    answers: [
      { id: "class-c-3-7-a", text: "Answer the call and keep the conversation short.", isCorrect: false },
      {
        id: "class-c-3-7-b",
        text: "Do not answer the phone and let it go to voice mail.",
        isCorrect: true,
      },
      {
        id: "class-c-3-7-c",
        text: "Answer the call if you are stopped at a red light.",
        isCorrect: false,
      },
    ],
  },
  {
    id: "class-c-3-8",
    question:
      "If a traffic signal is green, but traffic is blocking the intersection, what should you do?",
    explanation:
      "Do not block an intersection. Wait until there is enough room for your entire vehicle to clear the other side before entering.",
    category: "traffic-signals",
    imageUrl: null,
    answers: [
      {
        id: "class-c-3-8-a",
        text: "Partially enter the intersection, as allowed by traffic.",
        isCorrect: false,
      },
      {
        id: "class-c-3-8-b",
        text: "Wait and do not enter the intersection until your vehicle can get completely across.",
        isCorrect: true,
      },
      {
        id: "class-c-3-8-c",
        text: "Drive around the traffic on the shoulder to help ease the congestion.",
        isCorrect: false,
      },
    ],
  },
  {
    id: "class-c-3-9",
    question: "In which lane should you end your turn when making a right turn?",
    explanation:
      "Finish a right turn in the lane closest to the right curb unless signs or pavement markings show otherwise.",
    category: "rules-of-the-road",
    imageUrl: null,
    answers: [
      { id: "class-c-3-9-a", text: "Any lane free of traffic.", isCorrect: false },
      { id: "class-c-3-9-b", text: "The lane closest to the left edge of the road.", isCorrect: false },
      {
        id: "class-c-3-9-c",
        text: "The lane closest to the right edge of the road.",
        isCorrect: true,
      },
    ],
  },
  {
    id: "class-c-3-10",
    question: "When is it required for you to obey directions from a crossing guard?",
    explanation:
      "You must obey crossing guards whenever they direct traffic, especially near schools and crosswalks.",
    category: "sharing-road",
    imageUrl: null,
    answers: [
      { id: "class-c-3-10-a", text: "At all times.", isCorrect: true },
      { id: "class-c-3-10-b", text: "During school hours only.", isCorrect: false },
      { id: "class-c-3-10-c", text: "Only when children are present in front of a school.", isCorrect: false },
    ],
  },
];

export const QNA_QUESTION_SETS = [
  {
    id: "class-c-written-test-1",
    title: "Class C Written Test 1",
    questions: CLASS_C_WRITTEN_TEST_1,
  },
  {
    id: "class-c-written-test-2",
    title: "Class C Written Test 2",
    questions: CLASS_C_WRITTEN_TEST_2,
  },
  {
    id: "class-c-written-test-3",
    title: "Class C Written Test 3",
    questions: CLASS_C_WRITTEN_TEST_3,
  },
] as const;

export function getQnaQuestionSet(setId: string) {
  return QNA_QUESTION_SETS.find((set) => set.id === setId) ?? null;
}
