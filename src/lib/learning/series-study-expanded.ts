import type { TopicInput } from "./series-study-content";

export const EXPANDED_PRIMARY_TOPICS: Record<number, TopicInput> = {
  11: {
    id: "traffic-signs",
    title: "Traffic Signs",
    keyPoints: [
      "Shape and color identify sign type before you read the words.",
      "Regulatory signs (red, white, black) tell you what you must do.",
      "Warning signs (yellow, diamond) alert you to hazards ahead.",
      "Guide signs (green, blue, brown) provide directions and services.",
    ],
    explanation: `California uses a standardized sign system so drivers can react quickly — even at night or in rain when words are harder to read. Shape comes first: an octagon always means STOP, an inverted triangle means YIELD, a diamond warns of hazards, and rectangles carry regulations or directions. Color reinforces the message — red means stop or prohibition, yellow means caution, orange marks construction, and green shows destinations on freeways.

Regulatory signs have the force of law. A white speed limit sign sets the maximum speed in ideal conditions; a red circle with a slash means the action shown is forbidden. Warning signs give you time to adjust — curve ahead, merge, pedestrian crossing, or slippery when wet. They do not change the posted speed by themselves, but the Basic Speed Law still requires you to slow to a safe speed for conditions.

Guide signs help you navigate without sudden lane changes. Green signs list cities and distances; blue signs point to services like gas, food, and hospitals; brown signs mark recreation areas. On the permit test, expect questions that match a sign shape or color to its meaning — study the California Driver Handbook sign chart until recognition feels automatic.`,
    scenarioIntro: "You are driving on a two-lane road outside town at dusk.",
    scenarioSetup:
      "Up ahead you spot a yellow diamond-shaped sign with a black symbol of a deer. Traffic is light and the posted speed is 55 mph. No other vehicles are close behind you.",
    scenarioPrompt: "What does this sign tell you to do?",
    scenarioChoices: [
      { id: "a", text: "Stop immediately — deer have right-of-way", correct: false },
      { id: "b", text: "Slow down, stay alert, and be ready for animals on the road", correct: true },
      { id: "c", text: "Speed up to pass the area before dark", correct: false },
    ],
    scenarioExplanation:
      "Yellow diamond warning signs alert you to hazards ahead. Reduce speed and scan shoulders — wildlife often crosses at dawn and dusk.",
    scenarioTip:
      "On the test, 'warning' signs are yellow diamonds; they prepare you, not command a full stop unless paired with another sign.",
    scenarioWhy:
      "Animal strikes cause thousands of California crashes each year — early scanning gives you time to brake.",
    diagram: {
      kind: "traffic-signs",
      title: "Sign shapes and colors",
      intro: "Learn to read shape and color at a glance — before you are close enough to read words.",
      caption: "Octagon = stop · Triangle = yield · Diamond = warning · Rectangle = regulation or guide.",
      details:
        "California DMV tests sign recognition heavily. If you see an octagon, stop. An inverted triangle means yield. Diamonds warn; rectangles regulate or guide.",
      callouts: ["Octagon — STOP", "Diamond — warning", "Rectangle — speed or rules", "Green — directions"],
      tips: [
        "Orange signs mean construction — fines double in work zones.",
        "Fluorescent yellow-green marks school and pedestrian zones.",
      ],
    },
    motion: {
      title: "Spot signs early",
      intro: "Scan far down the road — you should identify sign type before you need to act.",
      description:
        "Watch how a driver picks up a warning sign, eases off the gas, and positions for a curve before the steering input.",
      steps: [
        { title: "Scan ahead", text: "Look 12–15 seconds down the road for sign shapes." },
        { title: "Identify type", text: "Shape and color tell you whether to stop, yield, or slow." },
        { title: "Adjust early", text: "Change speed or position before you reach the hazard." },
      ],
      takeaway: "Sign literacy prevents last-second braking — recognize, then react with time to spare.",
      motion: "sign-recognition",
    },
  },

  13: {
    id: "sharing-the-road",
    title: "Sharing the Road",
    keyPoints: [
      "Give bicyclists at least three feet when passing — it's the law in California.",
      "Large trucks have huge blind spots — if you cannot see the driver's mirrors, they cannot see you.",
      "Motorcyclists are smaller and harder to judge — look twice before changing lanes.",
      "Slow-moving vehicles must use the right lane or shoulder when safe.",
    ],
    explanation: `Driving in California means sharing space with pedestrians, bicyclists, motorcyclists, buses, farm equipment, and oversized trucks. Each user has different speed, visibility, and vulnerability. Your job is to predict their moves and give them room — even when you have the legal right-of-way.

Bicyclists may legally use full traffic lanes when the lane is too narrow to share side by side. When passing, California's Three Feet for Safety Act requires at least three feet of clearance; if you cannot pass safely, wait behind until oncoming traffic clears. Never honk close to a cyclist — it can cause a crash.

Large trucks need extra space to turn — their rear wheels track inside the front wheels on wide turns. Never squeeze between a turning truck and the curb. Motorcycles accelerate quickly and disappear in blind spots; always signal and shoulder-check before lane changes. When you see a slow-moving vehicle emblem (orange triangle) on a farm vehicle or road maintenance truck, pass only where legal and safe, with plenty of gap.`,
    scenarioIntro: "You are on a city street with a bike lane to your right.",
    scenarioSetup:
      "A cyclist is riding in the traffic lane ahead because parked cars block the bike lane. Oncoming traffic is clear for now, but the lane is narrow. You are approaching at 25 mph.",
    scenarioPrompt: "What is the safest way to pass the cyclist?",
    scenarioChoices: [
      { id: "a", text: "Honk and squeeze past in the same lane", correct: false },
      { id: "b", text: "Wait for a clear gap, move left, and leave at least three feet", correct: true },
      { id: "c", text: "Pass in the bike lane since it is empty ahead", correct: false },
    ],
    scenarioExplanation:
      "California law requires at least three feet when passing a bicyclist. If the lane is too narrow, wait until you can use part of the adjacent lane safely.",
    scenarioTip:
      "Treat cyclists as slow-moving vehicles with the same lane rights — patience beats a close pass.",
    scenarioWhy:
      "Side-swipe and mirror strikes are common when drivers underestimate cyclist width and wobble room.",
    diagram: {
      kind: "crosswalk",
      title: "Sharing space with vulnerable users",
      caption: "Pedestrians, cyclists, and motorcyclists need extra margin — you provide it.",
      callouts: ["Bike lane", "Three-foot pass", "Crosswalk yield", "Blind-spot check"],
    },
    motion: {
      title: "Passing a cyclist safely",
      description:
        "Signal, check mirrors and blind spot, move left with clearance, then return to lane smoothly.",
      motion: "pedestrian-yield",
    },
  },

  17: {
    id: "night-driving",
    title: "Night Driving",
    keyPoints: [
      "Low beams within 500 feet of oncoming traffic; dim within 300 feet when following.",
      "Reduce speed at night — you cannot see as far, and pedestrians are harder to spot.",
      "Never stare at oncoming high beams — look toward the right edge of your lane.",
      "Clean windshield and headlights; fatigue is as dangerous as impairment.",
    ],
    explanation: `Night driving cuts visibility dramatically. Headlights reveal only a limited cone ahead, and depth perception suffers. California law requires low beams when within 500 feet of an oncoming vehicle and within 300 feet when following another car. High beams help on dark rural roads but must be dimmed promptly so you do not blind other drivers.

Pedestrians, cyclists, and animals are harder to see after dark — especially if they wear dark clothing. Scan sidewalks and road edges, not just the lane center. Inside the car, keep dashboard lights low and avoid phone screens that ruin night vision. Dirty windshields create glare; clean inside and out before a night trip.

Fatigue causes micro-sleeps you may not notice. If you yawn repeatedly, drift in the lane, or miss exits, pull off at a safe rest area. California's Basic Speed Law applies at night: even if the posted limit is 55, you must drive no faster than what you can safely see and stop within your headlight range.`,
    scenarioIntro: "You are driving on a rural highway at night.",
    scenarioSetup:
      "An oncoming pickup is about 400 feet ahead with bright headlights. You currently have your high beams on because no other traffic is nearby except that vehicle.",
    scenarioPrompt: "What should you do with your headlights?",
    scenarioChoices: [
      { id: "a", text: "Flash high beams to warn the other driver", correct: false },
      { id: "b", text: "Switch to low beams and look toward the right edge of the road", correct: true },
      { id: "c", text: "Turn headlights off until they pass", correct: false },
    ],
    scenarioExplanation:
      "Dim to low beams within 500 feet of oncoming traffic. Avoid looking directly at their lights to preserve night vision.",
    diagram: {
      kind: "traffic-signal",
      title: "Headlight range and glare",
      caption: "Low beams for traffic · high beams only when alone on dark roads.",
      callouts: ["500 ft — dim for oncoming", "300 ft — dim when following", "Scan road edge", "Avoid glare"],
    },
    motion: {
      title: "Dimming for oncoming traffic",
      description: "Switch to low beams early and shift gaze to the right lane line until the vehicle passes.",
      motion: "slow-for-conditions",
    },
  },

  18: {
    id: "defensive-driving",
    title: "Defensive Driving",
    keyPoints: [
      "Assume other drivers may make mistakes — leave an escape path.",
      "Keep a 3-second following distance minimum; add seconds in rain or at speed.",
      "Scan 12–15 seconds ahead and check mirrors every 5–8 seconds.",
      "Avoid road rage — do not engage; create distance instead.",
    ],
    explanation: `Defensive driving means protecting yourself even when others break rules. You cannot control every driver around you, but you can control your speed, space, and attention. The SIPDE process — Scan, Identify, Predict, Decide, Execute — turns passive looking into active planning. Scan intersections before you enter, predict that a left-turning car might cut you off, and decide early whether to cover the brake.

Space is your best tool. Maintain at least a three-second gap behind the vehicle ahead: pick a fixed object, count when they pass it, you should reach it no sooner than three seconds later. At freeway speeds or in rain, use four or more seconds. Position your vehicle where you can see and be seen — avoid lingering in other drivers' blind spots.

Aggressive drivers and road rage create secondary crashes. Do not make eye contact, gesture, or brake-check. If someone tailgates, move right when safe and let them pass. On the permit test, defensive answers almost always favor slower, wider margins, and yielding over asserting right-of-way.`,
    scenarioIntro: "You are in the middle lane of a busy freeway.",
    scenarioSetup:
      "A driver is tailgating you and weaving. Traffic to your right is moving slightly slower but the lane is open ahead. You have room to change lanes if you signal first.",
    scenarioPrompt: "What is the most defensive response?",
    scenarioChoices: [
      { id: "a", text: "Brake-check them so they back off", correct: false },
      { id: "b", text: "Signal, check blind spot, and move right when safe to create space", correct: true },
      { id: "c", text: "Speed up and block them from passing", correct: false },
    ],
    scenarioExplanation:
      "Creating distance de-escalates tension. Changing lanes when safe removes you from a dangerous following situation.",
    diagram: {
      kind: "speed-zone",
      title: "Space cushion around your vehicle",
      caption: "Front gap · side visibility · rear awareness.",
      callouts: ["3-second gap", "Escape lane", "Mirror scan", "Blind-spot clear"],
    },
    motion: {
      title: "Maintaining a space cushion",
      description: "Adjust speed and lane position so you always have room to stop or steer around trouble.",
      motion: "slow-for-conditions",
    },
  },

  19: {
    id: "weather-conditions",
    title: "Weather Conditions",
    keyPoints: [
      "California's Basic Speed Law requires slowing below the posted limit when conditions are unsafe.",
      "Turn on headlights in rain — wipers on means lights on.",
      "Hydroplaning risk rises above 35 mph on wet pavement; ease off the gas, do not brake hard.",
      "Fog: low beams only; high beams reflect back and blind you.",
    ],
    explanation: `California weather ranges from coastal fog to mountain snow and desert heat. Posted speed limits assume dry pavement and clear visibility — they are maximums, not targets. When rain, fog, smoke, or wind reduce traction or sight distance, the Basic Speed Law requires you to slow to a safe speed, even if that means driving well under the limit.

In rain, roads are slickest in the first minutes when oil floats to the surface. Increase following distance to at least four seconds, avoid sudden steering, and use headlights whenever wipers run. If you feel the steering go light, you may be hydroplaning — ease off the accelerator and steer straight until tires regain grip. Never use cruise control on wet roads.

Fog near the coast demands low-beam headlights and reduced speed. Use the right edge line or fog line as a guide if visibility drops severely. In strong wind, grip the wheel firmly and give extra room to high-profile vehicles. Carry chains where required in mountain passes — check Caltrans road conditions before winter trips.`,
    scenarioIntro: "Light rain starts on the freeway during your practice drive.",
    scenarioSetup:
      "The posted limit is 65 mph. Traffic around you still moves at 60–65. Your windshield wipers are on intermittent and spray from trucks reduces visibility.",
    scenarioPrompt: "What speed is appropriate?",
    scenarioChoices: [
      { id: "a", text: "Match traffic at 65 — everyone else is doing it", correct: false },
      { id: "b", text: "Slow to a speed where you can stop within what you can see", correct: true },
      { id: "c", text: "Turn on hazard lights and stop in the lane", correct: false },
    ],
    scenarioExplanation:
      "Basic Speed Law overrides the posted limit in rain. Drive only as fast as conditions allow safe stopping.",
    diagram: {
      kind: "speed-zone",
      title: "Adjusting for rain and fog",
      caption: "Posted max ≠ safe speed in bad weather.",
      callouts: ["Wipers on — lights on", "4-second gap", "Low beams in fog", "Ease off gas if hydroplaning"],
    },
    motion: {
      title: "Slowing for wet pavement",
      description: "Gradually reduce speed and widen following distance as traction drops.",
      motion: "slow-for-conditions",
    },
  },

  20: {
    id: "emergency-situations",
    title: "Emergency Situations",
    keyPoints: [
      "If your brakes fail, pump the pedal, downshift, and use the parking brake gradually.",
      "After any crash with injury or major damage, stop, aid if safe, and exchange information.",
      "Move disabled vehicles off the roadway when possible — California Freeway Service Patrol helps on many freeways.",
      "Know where your hazard lights, flashers, and emergency kit are before you need them.",
    ],
    explanation: `Emergencies demand calm, practiced responses. Tire blowouts: grip the wheel firmly, do not brake suddenly, ease off the gas, and steer straight until speed drops, then pull off safely. Brake failure: pump the brake pedal hard and fast, shift to a lower gear, and apply the parking brake slowly to avoid skidding. If nothing works, scrape the curb gently as a last resort on surface streets.

After a collision, California law requires you to stop, render reasonable aid, and exchange driver license, insurance, and vehicle information. If anyone is injured or damage exceeds $1,000, report to law enforcement. On freeways, move vehicles out of traffic lanes if nobody is hurt and the cars still drive — otherwise stay belted and call 911.

Keep flares or reflective triangles, a charged phone, and basic first-aid supplies. If your vehicle stalls on tracks at a railroad crossing, get everyone out immediately and run at an angle away from the tracks toward the oncoming train direction. Never stand on the tracks or assume you can beat a train.`,
    scenarioIntro: "You hear a loud pop and your car pulls hard to the right.",
    scenarioSetup:
      "You suspect a front tire blowout at 55 mph on a multi-lane highway. Traffic is moderate and the right shoulder is wide enough if you can reach it.",
    scenarioPrompt: "What should you do first?",
    scenarioChoices: [
      { id: "a", text: "Brake hard immediately to stop as fast as possible", correct: false },
      { id: "b", text: "Hold the wheel straight, ease off the gas, and pull off when speed is down", correct: true },
      { id: "c", text: "Jerk the wheel left to get to the median", correct: false },
    ],
    scenarioExplanation:
      "Sudden braking during a blowout can cause a spin. Stabilize steering, slow gradually, then exit the roadway.",
    diagram: {
      kind: "railroad",
      title: "Emergency response priorities",
      caption: "Stabilize · slow · pull off · call for help.",
      callouts: ["Blowout — steer straight", "Brake failure — pump & downshift", "Crash — stop & exchange info", "Railroad — exit immediately"],
    },
    motion: {
      title: "Controlled slowdown after a blowout",
      description: "Maintain lane control, let speed bleed off, then signal and move to the shoulder.",
      motion: "slow-for-conditions",
    },
  },

  21: {
    id: "alcohol-drugs",
    title: "Alcohol & Drugs",
    keyPoints: [
      "Zero tolerance for drivers under 21 — any measurable alcohol (0.01% BAC) can mean license loss.",
      "Adults are DUI at 0.08% BAC; impairment starts well before that level.",
      "Prescription and over-the-counter drugs can impair driving — read labels and ask your doctor.",
      "California implied consent: refusing a chemical test after DUI arrest carries automatic license suspension.",
    ],
    explanation: `Alcohol and drugs slow reaction time, blur judgment, and reduce coordination — the three skills driving demands most. For drivers under 21, California has zero tolerance: a BAC of 0.01% or higher on a preliminary alcohol screening can result in a one-year license suspension. Adults face DUI charges at 0.08% BAC, but crashes increase at much lower levels because attention and lane keeping suffer first.

Drugs include more than illegal substances. Marijuana, even if legally used by adults, impairs driving and combines dangerously with alcohol. Antihistamines, sleep aids, and pain medications may cause drowsiness or dizziness — if a label warns against operating machinery, that includes cars. When you drive, you are legally responsible for every substance in your system.

California's implied consent law means that by driving on public roads, you agree to a breath, blood, or urine test if arrested for DUI. Refusal triggers an automatic suspension regardless of court outcome. Plan rides before parties: designated drivers, rideshare, or public transit. One night of convenience is cheaper than fines, jail, injury, or killing someone.`,
    scenarioIntro: "Your friend had two beers at a party and insists they are fine to drive home.",
    scenarioSetup:
      "You are 17 and still on a provisional license. Your friend is 19 and claims coffee will sober them up. It is a 20-minute drive on surface streets.",
    scenarioPrompt: "What is true about alcohol and driving?",
    scenarioChoices: [
      { id: "a", text: "Coffee and cold showers eliminate alcohol from the bloodstream quickly", correct: false },
      { id: "b", text: "Only time lowers BAC — impairment can remain after you feel alert", correct: true },
      { id: "c", text: "Two beers never affect someone over 18", correct: false },
    ],
    scenarioExplanation:
      "The liver metabolizes alcohol at a fixed rate — nothing speeds it up. Impairment can linger after the buzz fades.",
    diagram: {
      kind: "stop-sign",
      title: "BAC limits in California",
      caption: "Under 21: 0.01% · 21+: DUI at 0.08% · commercial: 0.04%.",
      callouts: ["Zero tolerance under 21", "DUI at 0.08% adults", "Implied consent", "Designated driver"],
    },
    motion: {
      title: "Impairment builds before you feel drunk",
      description: "Reaction time drops early — plan a sober ride before the first drink.",
      motion: "slow-for-conditions",
    },
  },

  22: {
    id: "distracted-driving",
    title: "Distracted Driving",
    keyPoints: [
      "Handheld phone use while driving is illegal for all ages in California.",
      "Minors cannot use any phone — handheld or hands-free — except for emergencies.",
      "Texting combines visual, manual, and cognitive distraction — among the deadliest.",
      "Set GPS and playlists before you shift into drive.",
    ],
    explanation: `Distraction is anything that takes your eyes, hands, or mind off driving. At 55 mph, looking at a phone for five seconds means traveling the length of a football field essentially blind. California bans handheld phone use for all drivers. Drivers under 18 may not use a cell phone at all while driving, even hands-free, except to call emergency services.

Texting is especially dangerous because it hits all three distraction types at once. Voice-to-text still pulls mental focus from the road. Eating, grooming, reaching for items, or intense conversations with passengers create similar gaps in attention. Mount phones where you can glance without losing sight of traffic, and enter destinations before moving.

If you must take a call on a hands-free system as an adult, keep it brief. Better: pull off the road in a safe lot. On the permit test, any answer that involves reading or typing while moving is wrong. Build the habit now — provisional drivers face stricter rules, and tickets add points that raise insurance costs.`,
    scenarioIntro: "Your phone buzzes with a text while you are on the freeway.",
    scenarioSetup:
      "You are 16 with a provisional license. Traffic is flowing at 60 mph in the right lane. The message appears to be from a parent asking where you are.",
    scenarioPrompt: "What should you do?",
    scenarioChoices: [
      { id: "a", text: "Read and reply quickly while keeping one eye on the road", correct: false },
      { id: "b", text: "Ignore it until you can safely exit and park, or have your passenger respond", correct: true },
      { id: "c", text: "Hold the phone below the window line so nobody sees", correct: false },
    ],
    scenarioExplanation:
      "Provisional drivers cannot use phones while driving except for emergencies. Pull off safely or wait — no text is worth a crash.",
    diagram: {
      kind: "lane-change",
      title: "Eyes on the road",
      caption: "Phone down · GPS set · eyes scan ahead.",
      callouts: ["No handheld use", "Minors — no phone at all", "Set GPS before moving", "Pull off to text"],
    },
    motion: {
      title: "Focus on driving",
      description: "Hands on wheel, eyes ahead — distractions wait until you are parked.",
      motion: "lane-change",
    },
  },

  23: {
    id: "insurance-collisions",
    title: "Insurance & Collisions",
    keyPoints: [
      "California requires minimum liability insurance: $30,000 injury per person, $60,000 per crash, $15,000 property.",
      "Always exchange license, insurance, and registration after a crash — even minor ones.",
      "Report crashes with injury, death, or major damage to the DMV within 10 days (SR 1 form).",
      "Uninsured motorists face license suspension and personal liability for all damages.",
    ],
    explanation: `Financial responsibility laws exist because crashes cost money — medical bills, repairs, lost wages. California requires liability insurance at minimum limits often written as 30/60/15. Driving without proof of insurance can mean ticket, tow, and license suspension. Your parent's policy usually covers you while learning, but confirm before you drive solo.

After any collision, stop immediately. Check for injuries and call 911 if anyone is hurt. Move vehicles out of traffic if they still run and nobody is injured. Exchange names, addresses, phone numbers, driver license numbers, insurance company and policy numbers, and vehicle registration. Take photos of damage, positions, and skid marks. Do not admit fault at the scene — report facts to your insurer.

If total damage exceeds $1,000 or anyone is injured or killed, file an SR 1 report with the DMV within 10 days regardless of fault. Hit-and-run or driving uninsured leaves you personally responsible for every dollar — savings from skipping insurance vanish after one crash.`,
    scenarioIntro: "You lightly rear-end someone at a stoplight.",
    scenarioSetup:
      "Both cars have minor bumper damage. Nobody is hurt. The other driver is upset but willing to talk. No police are on scene yet.",
    scenarioPrompt: "What must you do?",
    scenarioChoices: [
      { id: "a", text: "Drive away if the damage looks small", correct: false },
      { id: "b", text: "Stop, exchange information, and document the scene", correct: true },
      { id: "c", text: "Argue about fault before sharing any documents", correct: false },
    ],
    scenarioExplanation:
      "Leaving the scene is a hit-and-run crime. Exchange required information and report to insurance and DMV if thresholds apply.",
    diagram: {
      kind: "four-way-stop",
      title: "After a collision",
      caption: "Stop · aid · exchange info · report if required.",
      callouts: ["Exchange insurance", "Photo documentation", "SR 1 if required", "Never leave scene"],
    },
    motion: {
      title: "Safe post-crash steps",
      description: "Move to safety, check injuries, exchange details calmly, then report.",
      motion: "four-way-yield",
    },
  },

  24: {
    id: "hit-and-run-laws",
    title: "Hit & Run Laws",
    keyPoints: [
      "Leaving any crash scene without identifying yourself is a hit-and-run — misdemeanor or felony.",
      "You must attempt to locate the owner if you hit a parked car — leave a note with contact info if they are gone.",
      "Penalties include jail, fines, license revocation, and civil lawsuits.",
      "Even minor parking-lot taps require stopping and reporting — 'nobody saw' is not a defense.",
    ],
    explanation: `Hit-and-run means leaving after damaging property or injuring someone without fulfilling legal duties. California requires you to stop, provide your name and address, show your driver license and registration, and give insurance information. If you cannot find the owner of a parked vehicle, attach a secure note with your contact details and report the crash to police.

Felony hit-and-run applies when someone is injured or killed and you flee — penalties include state prison time. Misdemeanor hit-and-run for property damage still brings jail up to six months, heavy fines, and two points on your record. Insurance companies may deny coverage for intentional flight.

Panic is not a legal excuse. If you clip a mirror in a garage or scrape a bumper in a lot, stop and locate the owner or leave proper notice. Security cameras are everywhere. Turning yourself in promptly may reduce consequences compared to being tracked down later.`,
    scenarioIntro: "You misjudge a turn and scrape a parked car's fender.",
    scenarioSetup:
      "The lot is empty and the damage is a long scratch — no airbags deployed, nobody around. You are already late for school.",
    scenarioPrompt: "What are you legally required to do?",
    scenarioChoices: [
      { id: "a", text: "Leave — it is just cosmetic and nobody saw", correct: false },
      { id: "b", text: "Try to find the owner; if unavailable, leave a visible note with your contact info", correct: true },
      { id: "c", text: "Wait exactly five minutes then drive off", correct: false },
    ],
    scenarioExplanation:
      "California requires identifying yourself after property damage. A secure note with name, phone, and explanation satisfies duty when the owner is absent.",
    diagram: {
      kind: "stop-sign",
      title: "Hit-and-run consequences",
      caption: "Stop · identify · report — fleeing makes everything worse.",
      callouts: ["Stop at scene", "Note on parked car", "Report to police", "Felony if injury"],
    },
    motion: {
      title: "Do the right thing at the scene",
      description: "Stop immediately — fleeing turns an accident into a crime.",
      motion: "four-way-yield",
    },
  },

  25: {
    id: "vehicle-registration",
    title: "Vehicle Registration",
    keyPoints: [
      "Vehicles must be registered with the DMV — registration stickers go on the rear plate.",
      "Smog certification is required for most gasoline vehicles when registering in California.",
      "Registration fees fund roads and public safety — driving unregistered risks tickets and tow.",
      "Notify DMV within 10 days of address changes.",
    ],
    explanation: `Registration connects a vehicle to an owner and proves fees are paid. When you buy a car in California, the seller signs the title, you pay use tax, obtain smog certification if required, and submit paperwork to the DMV. New residents must register within 20 days of establishing residency. Expired tags are an easy pullover for law enforcement.

Smog checks keep excessive pollution off California roads. Most gasoline cars more than eight model years old need a smog certificate before sale or registration renewal. Electric vehicles are exempt from smog but still register. Keep proof of insurance in the vehicle or accessible digitally as California allows.

Your license and registration addresses should match current residence — update both within 10 days of moving. Parking tickets and toll violations tie to registration records. Before a road trip in a family car, confirm tags are current and the insurance card is in the glove box.`,
    scenarioIntro: "Your family buys a used car from a private seller.",
    scenarioSetup:
      "The seller has a signed title and says smog was done last month. You want to drive it home today and register later this week.",
    scenarioPrompt: "Before driving on public roads, what should be confirmed?",
    scenarioChoices: [
      { id: "a", text: "Only that the seller seems trustworthy", correct: false },
      { id: "b", text: "Valid registration or temporary permit, insurance, and required smog paperwork", correct: true },
      { id: "c", text: "Nothing — used cars are automatically legal to drive", correct: false },
    ],
    scenarioExplanation:
      "Unregistered vehicles cannot legally drive on public roads except limited dealer/temporary permit situations with proper documents.",
    diagram: {
      kind: "permit-journey",
      title: "Registration path",
      caption: "Title · smog · fees · insurance · stickers.",
      callouts: ["Smog certificate", "Proof of insurance", "Registration fees", "Address update (10 days)"],
    },
    motion: {
      title: "From purchase to legal plates",
      description: "Each registration step must complete before unrestricted driving.",
      motion: "permit-journey",
    },
  },

  26: {
    id: "driver-safety",
    title: "Driver Safety",
    keyPoints: [
      "Seat belts are mandatory for all occupants — driver is responsible for passengers under 16.",
      "Airbags supplement belts; never place rear-facing infant seats in front of an active airbag.",
      "Adjust headrests so the top aligns with the top of your ears to reduce whiplash.",
      "Never drive sleepy — drowsy driving mimics drunk driving.",
    ],
    explanation: `Driver safety starts before the engine turns over. Seat belts reduce fatal injury risk by about half in a crash. California requires all occupants to buckle up, and the driver can be cited if passengers under 16 are unbelted. Belts should sit low on the hips and across the shoulder — not under the arm or behind the back.

Airbags deploy violently — they save lives when combined with belts but can injure children or short drivers seated too close. Keep at least 10 inches between your chest and the steering wheel. Headrests are not comfort features; positioned correctly, they limit neck snap in rear impacts.

Maintain your vehicle: tire tread, brake fluid, wiper blades, and lights. A well-maintained car responds when you need it most. Avoid driving when sick, medicated, or exhausted — micro-sleeps at highway speed cover hundreds of feet with zero control.`,
    scenarioIntro: "You are about to drive three friends to a game.",
    scenarioSetup:
      "One friend in the back middle seat refuses to buckle up, saying the ride is short. You are 17 and still within the first year of your provisional license.",
    scenarioPrompt: "What should you do?",
    scenarioChoices: [
      { id: "a", text: "Drive anyway — it is their choice in the back", correct: false },
      { id: "b", text: "Do not move until every passenger, including yourself, is belted", correct: true },
      { id: "c", text: "Speed up so the trip finishes faster", correct: false },
    ],
    scenarioExplanation:
      "California holds the driver responsible for proper restraint use by passengers under 16. Everyone should belt up before any movement.",
    diagram: {
      kind: "left-turn-yield",
      title: "Safety systems in your vehicle",
      caption: "Belts · airbags · headrests · maintenance.",
      callouts: ["Seat belt fit", "Airbag clearance", "Headrest height", "Tire tread check"],
    },
    motion: {
      title: "Buckle before you roll",
      description: "Adjust belt and mirror, confirm passengers, then start — in that order.",
      motion: "slow-for-conditions",
    },
  },

  27: {
    id: "child-safety",
    title: "Child Safety",
    keyPoints: [
      "Children under 2 must ride in a rear-facing restraint unless they weigh 40+ lbs or are 40+ inches tall.",
      "Kids under 8 must use a car seat or booster in the back seat unless 4'9\" or taller.",
      "Never leave children or pets unattended in vehicles — heatstroke kills quickly in California summers.",
      "It is illegal to leave a child 6 or younger alone in a car without someone 12 or older present.",
    ],
    explanation: `Children are not small adults — their bones and muscles need restraints designed for their size. California's car seat law requires rear-facing seats for infants and toddlers under two (unless they meet height/weight exceptions), then forward-facing harness seats, then boosters until the seat belt fits correctly across the shoulder and hips — usually when they reach 4 feet 9 inches.

The back seat is safest for all children under 13 because front airbags can kill or seriously injure small bodies. Install seats tightly — movement at the base should be less than an inch. Many fire stations and CHP offices offer free inspection help.

Heat inside a parked car rises fast on sunny days — even 70°F outside can hit lethal temperatures inside within minutes. Leaving a child unattended is both dangerous and illegal under California's Kaitlyn's Law for children six and under. If you transport younger siblings, learn proper seat installation before you drive.`,
    scenarioIntro: "Your aunt asks you to drive your 5-year-old cousin to school.",
    scenarioSetup:
      "The child uses a booster seat at home but your car only has lap belts in the middle back seat. The cousin is 4 feet tall and weighs 45 pounds.",
    scenarioPrompt: "Where and how should the child ride?",
    scenarioChoices: [
      { id: "a", text: "Front seat with the seat belt — easier to watch them", correct: false },
      { id: "b", text: "Back seat in an appropriate booster with lap-shoulder belt", correct: true },
      { id: "c", text: "Back middle with just the lap belt — boosters are optional", correct: false },
    ],
    scenarioExplanation:
      "Children under 8 need proper restraints in the back seat unless they meet height exceptions. Booster seats require lap-shoulder belts.",
    diagram: {
      kind: "crosswalk",
      title: "Child restraint stages",
      caption: "Rear-facing → forward-facing → booster → seat belt when tall enough.",
      callouts: ["Rear-facing under 2", "Back seat under 13", "Booster until 4'9\"", "Never leave kids in hot cars"],
    },
    motion: {
      title: "Proper child restraint",
      description: "Secure the seat, buckle the child, verify fit before leaving the driveway.",
      motion: "pedestrian-yield",
    },
  },

  28: {
    id: "senior-driving",
    title: "Senior Driving",
    keyPoints: [
      "California may require renewals in person with vision tests for older drivers.",
      "Medications common in later life can affect reaction time — review side effects with doctors.",
      "Self-regulation works: avoid rush hour, night driving, or complex intersections when uncomfortable.",
      "Family conversations about driving retirement should focus on safety, not shame.",
    ],
    explanation: `Driving ability changes with age — not always for the worse, but vision, flexibility, and reaction time often shift. California DMV may require drivers around age 70 and older to renew in person and pass a vision test. Doctors may report conditions that affect safe driving; the DMV can request retests or restrict licenses to daytime or local driving.

Older drivers compensate well when they plan: choosing familiar routes, avoiding glare-heavy dusk hours, and making right turns instead of unprotected lefts across heavy traffic. Medications for blood pressure, sleep, or pain stack with natural fatigue — one pill may be fine alone but dangerous combined with driving.

If you ride with grandparents, notice warning signs: repeated close calls, scraped curbs, or confusion at simple intersections. Conversations about limiting or stopping driving are hard but prevent tragedies. Alternatives — transit, rides from family, senior shuttles — preserve independence without risking others.`,
    scenarioIntro: "Your grandfather offers to pick you up after practice at night.",
    scenarioSetup:
      "He mentions headlights seem dimmer lately and he got honked at merging last week. Practice ends at 8 p.m. on a busy arterial road.",
    scenarioPrompt: "What is a thoughtful response?",
    scenarioChoices: [
      { id: "a", text: "Ignore it — he has driven for decades", correct: false },
      { id: "b", text: "Suggest a daytime pickup or help schedule an eye exam and discuss safer routes", correct: true },
      { id: "c", text: "Tell him he should never drive again immediately", correct: false },
    ],
    scenarioExplanation:
      "Supporting older drivers means encouraging vision checks and adapting habits — not ignoring warning signs or shaming them.",
    diagram: {
      kind: "speed-zone",
      title: "Adapting as abilities change",
      caption: "Vision checks · medication review · route planning.",
      callouts: ["In-person renewal", "Avoid peak glare", "Medication effects", "Alternative transportation"],
    },
    motion: {
      title: "Safer choices over time",
      description: "Adjust when and where you drive to match current comfort and ability.",
      motion: "slow-for-conditions",
    },
  },

  29: {
    id: "environmental-driving",
    title: "Environmental Driving",
    keyPoints: [
      "Smooth acceleration and steady speeds burn less fuel and reduce emissions.",
      "Carpool and HOV lanes move more people with fewer vehicles — check occupancy rules.",
      "Anti-idling saves fuel — turn off the engine when parked more than a few seconds.",
      "Electric and hybrid vehicles have different maintenance but still require safe driving habits.",
    ],
    explanation: `How you drive affects air quality and fuel use across California's crowded basins. Jackrabbit starts and hard braking waste gas and wear brakes faster. Anticipate lights and coast when possible — steady driving can improve mileage 10–20%. Keep tires properly inflated; underinflation increases rolling resistance and heat.

High-Occupancy Vehicle (HOV) lanes require the posted minimum occupants — usually two or three including the driver. Clean Air Vehicle decals allow some solo plug-in and electric cars in HOV lanes; rules change, so verify current DMV sticker eligibility. Do not cross double yellow HOV boundaries except at designated entries.

Idling more than a few seconds while waiting burns fuel with zero miles traveled. California restricts commercial idling near schools. When shopping for a first car, consider efficiency and safety ratings together — smaller footprint does not mean less protection if you choose modern crash-tested models.`,
    scenarioIntro: "You are stuck in a school pickup line with the engine running.",
    scenarioSetup:
      "You have waited 12 minutes without moving. It is warm but not hot, and your AC is on high. The line might move soon.",
    scenarioPrompt: "What reduces unnecessary pollution and fuel waste?",
    scenarioChoices: [
      { id: "a", text: "Rev the engine occasionally to keep it warm", correct: false },
      { id: "b", text: "Turn off the engine if you expect to sit more than a minute, then restart when traffic moves", correct: true },
      { id: "c", text: "Shift to neutral and floor the gas to clear the exhaust", correct: false },
    ],
    scenarioExplanation:
      "Extended idling wastes fuel and adds emissions. Modern engines tolerate restart cycles better than prolonged idle.",
    diagram: {
      kind: "freeway-merge",
      title: "Eco-driving habits",
      caption: "Smooth inputs · proper tire pressure · HOV when eligible.",
      callouts: ["Steady speed", "HOV occupancy rules", "Reduce idling", "Plan trips to combine errands"],
    },
    motion: {
      title: "Smooth driving saves fuel",
      description: "Gradual acceleration and early coasting cut emissions without sacrificing safety.",
      motion: "freeway-merge",
    },
  },

  30: {
    id: "final-review-permit-prep",
    title: "Final Review & Permit Prep",
    keyPoints: [
      "The knowledge test draws from the entire handbook — signs, laws, fines, and scenarios.",
      "Read each question twice; look for absolute words like 'always' and 'never' that often signal wrong answers.",
      "If unsure, eliminate clearly wrong choices, then pick the safest, most conservative option.",
      "Review missed topics from practice exams before retesting — DMV charges for each attempt.",
    ],
    explanation: `You are near the finish line of driver education, but the permit test still demands broad recall. Questions span traffic signs, right-of-way, speed laws, alcohol limits, insurance, and collision reporting — not just the last series you studied. Build a short review list from practice quizzes: any topic you miss twice belongs on flashcards.

Test-taking strategy matters. California DMV questions often describe a scenario and ask for the best action. The safest choice — yield, slow down, increase following distance — beats aggressive or illegal options. Watch for trick wording: 'legal' versus 'safe' are not always the same, but when both align, that is usually your answer.

Before test day, sleep normally, eat breakfast, and bring documents. During the exam, flag hard questions and return later rather than panic-guessing. Passing requires 38 correct out of 46 for the standard Class C test — about 83%. If you fail, use the waiting period to study weak areas, not to cram unrelated facts. This course gave you the depth; now trust steady review over last-minute cramming.`,
    scenarioIntro: "You are on question 40 of your permit test.",
    scenarioSetup:
      "A question asks what to do when a school bus ahead stops on the opposite side of a divided highway with a raised median. You are unsure and have two answers left.",
    scenarioPrompt: "What strategy helps most?",
    scenarioChoices: [
      { id: "a", text: "Pick the answer that sounds strictest regardless of context", correct: false },
      { id: "b", text: "Recall the handbook rule for divided highways and choose the option matching it", correct: true },
      { id: "c", text: "Always choose 'stop' whenever a school bus appears", correct: false },
    ],
    scenarioExplanation:
      "On divided highways with physical medians, opposing traffic often does not stop for a bus on the other side — know specific exceptions, not generic rules.",
    scenarioTip:
      "Missed a practice question about school buses? That is a sign to reread the section — patterns repeat on the real test.",
    diagram: {
      kind: "dmv-test-flow",
      title: "Permit test readiness",
      caption: "Review weak topics · bring documents · read carefully · stay calm.",
      callouts: ["46 questions", "38 to pass", "Handbook review", "Safest answer wins"],
    },
    motion: {
      title: "Your path to passing",
      description: "Study, practice tests, document check, then knowledge exam — you are ready.",
      motion: "dmv-test-flow",
    },
  },
};

export const EXPANDED_SECOND_TOPICS: Record<number, TopicInput> = {
  1: {
    id: "dmv-documents",
    title: "Documents for your DMV visit",
    keyPoints: [
      "Bring proof of identity, Social Security number, and California residency.",
      "Minors need parental consent (DL 44 form signed) and proof of driver education completion.",
      "Check the DMV website for your appointment type — requirements differ for permit vs. license.",
      "Make copies or photos of documents in case something is misplaced.",
    ],
    explanation: `A DMV visit goes smoothly when your paperwork is complete before you walk in. California requires specific documents to prove who you are, that you may legally be in the U.S., and that you live in the state. For an instruction permit, teens under 18 also need proof of driver education or enrollment and a parent or guardian signature on the application.

Acceptable identity documents include a certified birth certificate, valid passport, or previous California DL/ID. Residency proof can be utility bills, school records, or bank statements with your name and address — usually two documents are required. Social Security number verification is mandatory; bring your card or a document showing the full number.

Missing one item can end your appointment that day. Use the DMV's online document checklist for "first driver's license" or "instruction permit" and pack everything the night before. Arrive with forms pre-filled when possible to reduce counter time.`,
    scenarioIntro: "You have a DMV appointment tomorrow for your instruction permit.",
    scenarioSetup:
      "You completed driver education online and your parent agreed to sign. You have your birth certificate and a school transcript with your address, but you are not sure about the Social Security requirement.",
    scenarioPrompt: "What should you verify before leaving for the DMV?",
    scenarioChoices: [
      { id: "a", text: "Only your birth certificate — that proves everything", correct: false },
      {
        id: "b",
        text: "Identity, residency, SSN proof, DL 44 with parent signature, and ed completion",
        correct: true,
      },
      { id: "c", text: "Just bring cash for the fee — they look up the rest", correct: false },
    ],
    scenarioExplanation:
      "California requires identity, residency, SSN verification, signed application, and driver education proof for minor permit applicants.",
    diagram: {
      kind: "dmv-test-flow",
      title: "Document checklist",
      caption: "ID · residency · SSN · forms · education proof.",
      callouts: ["Proof of identity", "Residency (2 docs)", "DL 44 signed", "Driver ed certificate"],
    },
    motion: {
      title: "Paperwork before the test",
      description: "Each document unlocks the next step at the counter — missing one stops the visit.",
      motion: "dmv-test-flow",
    },
  },

  2: {
    id: "logging-practice-hours",
    title: "Logging practice hours",
    keyPoints: [
      "California requires 50 hours of supervised practice for minors, including 10 at night.",
      "Log hours honestly — your parent or guardian certifies them when you apply for a license.",
      "Night driving means after sunset, not just in a dark parking lot.",
      "Spread practice across conditions: rain, hills, downtown, and freeways when ready.",
    ],
    explanation: `An instruction permit is not enough to earn a license — you must practice. California minors need at least 50 hours of supervised driving, and 10 of those hours must be at night. A licensed driver who meets state age requirements (usually 25 or older, or a certified instructor) must sit in the front passenger seat. Every hour should build real skill, not just count minutes in an empty lot.

Keep a practice log: date, duration, route type, and conditions. Many families use the DMV's official form or a simple notebook. Night hours count after sunset — city streetlights and headlights, not a closed course with floodlights. Include freeway merges, parallel parking, and heavy traffic when your supervisor agrees you are ready.

When you apply for your provisional license, a parent or guardian signs under penalty of perjury that you completed the hours. False logs are fraud. More importantly, gaps in practice show up on the drive test — examiners can tell when a teen has only driven the same two blocks.`,
    scenarioIntro: "You have had your permit for two months.",
    scenarioSetup:
      "You logged 30 hours, all on sunny afternoons in your neighborhood. Your drive test is in four months and you have never driven after dark or on the freeway.",
    scenarioPrompt: "What should you prioritize next?",
    scenarioChoices: [
      { id: "a", text: "Keep repeating the same route until you hit 50 hours", correct: false },
      {
        id: "b",
        text: "Add night drives, varied routes, and freeway practice with your supervisor",
        correct: true,
      },
      { id: "c", text: "Stop logging — only the total number matters", correct: false },
    ],
    scenarioExplanation:
      "California requires 10 night hours and expects varied experience. Diverse practice builds the judgment the drive test measures.",
    diagram: {
      kind: "permit-journey",
      title: "Practice hour requirements",
      caption: "50 total hours · 10 at night · certified by parent/guardian.",
      callouts: ["Daytime practice", "Night driving (10 hr)", "Supervised only", "Log each session"],
    },
    motion: {
      title: "Building real experience",
      description: "Watch the permit journey advance as day, night, and freeway hours accumulate.",
      motion: "permit-journey",
    },
  },

  3: {
    id: "drive-test-tips",
    title: "Behind-the-wheel test tips",
    keyPoints: [
      "Examiners watch smooth control — jerky starts and stops count against you.",
      "Shoulder checks before every lane change and merge are non-negotiable.",
      "Come to a full stop behind limit lines; rolling stops are automatic faults.",
      "If you make a small mistake, stay calm — one error rarely fails you alone.",
    ],
    explanation: `The behind-the-wheel test is not a trick course — it is a structured drive on public streets where a DMV examiner scores your habits. They watch mirror use, speed control, lane position, signaling, and how you handle intersections. Most failures come from avoidable patterns: incomplete stops, missing blind-spot checks, or speeding in school zones.

Before test day, drive the same car you will test in. Adjust mirrors and seat, know where the defroster and hazards are, and confirm registration and insurance are current. Examiners give clear instructions — listen fully before acting. If you did not hear something, ask them to repeat; that is allowed.

During the test, narrate silently in your head: scan, signal, mirror, shoulder, move. At stops, halt completely and count one beat before accelerating. Keep both hands on the wheel except when shifting. If you miss a turn they give, do not panic — they will redirect you. Safety and composure beat perfection.`,
    scenarioIntro: "Your drive test is in two weeks.",
    scenarioSetup:
      "Your instructor says your steering is smooth but you sometimes forget shoulder checks on right turns and you occasionally creep past stop lines.",
    scenarioPrompt: "What should you focus on in remaining practice?",
    scenarioChoices: [
      { id: "a", text: "Memorize the exact test route from online posts", correct: false },
      { id: "b", text: "Drill full stops and shoulder checks until they are automatic", correct: true },
      { id: "c", text: "Speed up through turns to show confidence", correct: false },
    ],
    scenarioExplanation:
      "Examiners score repeatable habits. Fix stop-line discipline and blind-spot checks — they appear on every test route.",
    diagram: {
      kind: "dmv-test-flow",
      title: "Drive test scoring areas",
      caption: "Stops · signals · mirrors · speed · lane control.",
      callouts: ["Full stop at line", "Shoulder check", "Smooth speed", "Listen to examiner"],
    },
    motion: {
      title: "What examiners watch",
      description: "Signal, mirror, shoulder, merge — the sequence repeats all test long.",
      motion: "dmv-test-flow",
    },
  },

  4: {
    id: "real-id-name-changes",
    title: "Real ID & name changes",
    keyPoints: [
      "REAL ID requires extra identity documents and is marked with a golden bear on California licenses.",
      "Starting May 2025, federal facilities and domestic flights require REAL ID or a passport.",
      "Name changes after marriage or court order need certified documents before DMV updates.",
      "Update your license within 10 days of any legal name or address change.",
    ],
    explanation: `California offers two license types: a standard federal-limited card and a REAL ID compliant with federal security standards. REAL ID requires proof of identity, Social Security number, and two proofs of residency in person — plan a longer DMV visit. The card shows a golden bear in the upper right corner. Without REAL ID or a valid passport, you cannot board domestic flights or enter certain federal buildings after enforcement deadlines.

If your legal name changes through marriage, divorce, or court order, bring certified marriage certificates, divorce decrees, or court papers when you update your license. The name on your license must match your Social Security record — update Social Security first, then DMV. Mismatches delay permits and licenses.

Address changes also require notification within 10 days. Use the DMV website for online address updates when eligible. Keeping records current avoids problems at permit tests, insurance claims, and traffic stops.`,
    scenarioIntro: "You turn 16 next month and your parent asks whether to get REAL ID when you apply.",
    scenarioSetup:
      "You have a passport for a family trip next year. The DMV website lists extra documents for REAL ID that you would need to gather.",
    scenarioPrompt: "When is REAL ID especially worth getting at your first license?",
    scenarioChoices: [
      { id: "a", text: "Never — standard licenses work for everything", correct: false },
      { id: "b", text: "If you will fly domestically without carrying a passport regularly", correct: true },
      { id: "c", text: "Only after you turn 21", correct: false },
    ],
    scenarioExplanation:
      "REAL ID (or a passport) satisfies federal ID requirements for domestic air travel and secure federal facilities.",
    diagram: {
      kind: "permit-journey",
      title: "REAL ID document path",
      caption: "Extra proofs · in-person visit · golden bear mark.",
      callouts: ["Certified identity docs", "Two residency proofs", "SSN match", "Golden bear symbol"],
    },
    motion: {
      title: "Choosing your license type",
      description: "Standard vs REAL ID — pick based on how you travel and use federal services.",
      motion: "permit-journey",
    },
  },

  5: {
    id: "first-time-driving",
    title: "Your first time behind the wheel",
    keyPoints: [
      "Start in an empty parking lot — feel pedals and steering before street traffic.",
      "Set seat and mirrors while parked; you should see clearly without stretching.",
      "Keep both hands at 9 and 3 (or 8 and 4) for modern airbag safety.",
      "Go slow — speed adds stress when you are still learning muscle memory.",
    ],
    explanation: `The first time you control a car is overwhelming and exciting. Start somewhere without moving traffic — a church lot on a weekday or an industrial park on Sunday. Practice smooth acceleration and braking at walking speed. Feel how much steering input the car needs; most beginners turn too sharply at first.

Before rolling, adjust the seat so you can press the brake fully with a slight knee bend. Mirrors should show a sliver of your own car in the side views and center the rear window. Buckle up, foot on brake, shift to drive, release brake slowly. Your supervisor should remind you gently — tension in the car makes every input jerky.

First street drives belong on calm residential roads at quiet times. Stop early for signs and lights; stopping late is the most common beginner scare. Talk through what you see: parked cars that might door open, kids near driveways, dogs on long leashes. Narrating builds scan habits examiners want later.`,
    scenarioIntro: "Today is your first practice session with your parent in the passenger seat.",
    scenarioSetup:
      "You are in a large empty lot. The engine is running, your foot is on the brake, and you feel nervous about releasing it.",
    scenarioPrompt: "What is the best first exercise?",
    scenarioChoices: [
      { id: "a", text: "Drive to a busy street immediately to get it over with", correct: false },
      { id: "b", text: "Creep forward and stop smoothly several times at low speed", correct: true },
      { id: "c", text: "Practice only steering with the car in park", correct: false },
    ],
    scenarioExplanation:
      "Low-speed start-stop drills build pedal feel and confidence before you add traffic complexity.",
    diagram: {
      kind: "stop-sign",
      title: "First session layout",
      caption: "Empty lot → quiet streets → gradually busier roads.",
      callouts: ["Seat & mirrors", "Foot on brake", "Smooth creep", "Supervisor ready"],
    },
    motion: {
      title: "First smooth start",
      description: "Brake, shift, release slowly — feel the car move without lurching.",
      motion: "slow-for-conditions",
    },
  },

  6: {
    id: "control-habits",
    title: "Control habits that stick",
    keyPoints: [
      "Cover the brake when you see brake lights ahead — saves reaction time.",
      "Steer with smooth inputs; small corrections beat wide swings.",
      "Use turn signals for every direction change, even in parking lots during practice.",
      "Build a pre-drive ritual: seat, mirrors, belt, phone away.",
    ],
    explanation: `Vehicle control is not talent — it is trained habit. Good drivers repeat the same small rituals until they happen without thinking. Before every drive: adjust seat height, set mirrors, buckle, stow phone, identify where lights and wipers are. That 30-second routine prevents the panic of hunting controls in rain.

Hand position at 9 and 3 or 8 and 4 gives steering range without crossing arms over the airbag zone. Push-pull steering keeps control during turns; do not palm the wheel from underneath. When braking, progressive pressure feels smoother to passengers and prevents rear-end scares.

Covering the brake means sliding your foot from gas to brake hover when you see hazards — brake lights, yellow lights, pedestrians at corners. You do not brake yet, but you cut reaction time. Pair that with scanning far ahead so your foot moves before the car ahead actually stops. Examiners notice riders who react late.`,
    scenarioIntro: "You are practicing in a neighborhood with frequent stop signs.",
    scenarioSetup:
      "Your supervisor notes you signal late and sometimes steer one-handed while shifting. Traffic is light but there are parked cars and occasional pedestrians.",
    scenarioPrompt: "Which habit should you fix first?",
    scenarioChoices: [
      { id: "a", text: "Signal at least 100 feet before turns and keep two hands on the wheel", correct: true },
      { id: "b", text: "Skip signals in empty areas to save effort", correct: false },
      { id: "c", text: "Steer faster so each turn finishes quicker", correct: false },
    ],
    scenarioExplanation:
      "Early signals and two-hand control are scored on the drive test and prevent conflicts with pedestrians and parked cars.",
    diagram: {
      kind: "lane-change",
      title: "Control habit loop",
      caption: "Scan → signal → smooth steer → progressive brake.",
      callouts: ["9 and 3 hands", "Early signal", "Cover brake", "Pre-drive checklist"],
    },
    motion: {
      title: "Smooth steering inputs",
      description: "Small, steady wheel movements keep the car predictable in the lane.",
      motion: "lane-change",
    },
  },

  7: {
    id: "following-distance",
    title: "Following distance & space",
    keyPoints: [
      "Use the 3-second rule minimum in dry conditions — pick a marker and count.",
      "Add one second for rain, night, or freeway speeds; more for ice or fog.",
      "If tailgated, increase your front gap so you can brake gently without being hit from behind.",
      "Space in front is easier to control than the driver behind you.",
    ],
    explanation: `Following too closely is a leading cause of rear-end crashes — especially for new drivers who misjudge stopping distance. Pick a fixed object the car ahead passes, then count seconds until you reach it. Three seconds is the handbook minimum in good conditions. At 65 mph, that gap is roughly 300 feet — longer than most beginners leave.

Rain, gravel, worn tires, or fatigue all lengthen stopping distance. The Basic Speed Law applies to gaps too: if you cannot stop smoothly within the space you have, you are too close. When someone tailgates you, do not brake-check; add space ahead so you can decelerate gradually if needed, and move right when safe to let them pass.

At stops, leave room to see the rear tires of the car ahead touch the pavement — that gap lets you maneuver if they stall and protects you if you are rear-ended. In traffic jams, resist creeping to bumper-touch distance; small impacts happen often in stop-and-go queues.`,
    scenarioIntro: "You are on the freeway at 60 mph in moderate traffic.",
    scenarioSetup:
      "The driver ahead passes an overpass shadow. You reach the same shadow about one second later. A pickup is riding close behind your bumper.",
    scenarioPrompt: "What should you do about following distance?",
    scenarioChoices: [
      { id: "a", text: "Stay one second behind — traffic is heavy", correct: false },
      { id: "b", text: "Ease off the gas to reopen a 3-second gap and consider moving right", correct: true },
      { id: "c", text: "Brake hard to warn the tailgater", correct: false },
    ],
    scenarioExplanation:
      "Freeway speeds need at least three seconds. Creating front space protects you from the tailgater and the car ahead.",
    diagram: {
      kind: "speed-zone",
      title: "Three-second following gap",
      caption: "Dry pavement minimum · add time in rain or at night.",
      callouts: ["Pick a marker", "Count 3 seconds", "See rear tires at stops", "Widen gap if tailgated"],
    },
    motion: {
      title: "Opening your space cushion",
      description: "Ease off the accelerator until the gap widens — no sudden brake taps needed.",
      motion: "slow-for-conditions",
    },
  },

  8: {
    id: "turns-blind-spots",
    title: "Turns & blind-spot checks",
    keyPoints: [
      "Signal before you brake for a turn when possible — it warns drivers behind you.",
      "Shoulder check toward the direction you move before every lane change or merge.",
      "Right turns stay close to the curb; left turns yield to oncoming and pedestrians.",
      "Do not swing wide on right turns — bicyclists may fill the gap you open.",
    ],
    explanation: `Turns combine steering, speed control, and right-of-way rules. Signal at least 100 feet before turns in business or residential districts — sooner on faster roads. Slow before the turn, not during it. For right turns, stay in the rightmost portion of your lane and finish in the nearest lane of the new street. Swinging left before a right turn cuts off cyclists in the bike lane.

Blind-spot checks are a quick head turn — not a long stare — over the shoulder toward the space you will enter. Mirrors miss the wedge beside your rear fenders. Every lane change, merge, and some turns near parked cars need that glance. On the drive test, missing one shoulder check is a common point deduction.

Left turns across traffic need patience. Pull into the intersection with wheels straight (not turned) while waiting so a rear bump does not push you into oncoming lanes. Yield to pedestrians and oncoming vehicles. Turn when the gap is clearly safe — guessing gets failing scores and real crashes.`,
    scenarioIntro: "You need to turn right into a shopping center driveway.",
    scenarioSetup:
      "A bike lane runs along the curb. A cyclist is approaching from behind in that lane. Your mirror shows no car directly beside you in the travel lane.",
    scenarioPrompt: "Before turning right, what must you do?",
    scenarioChoices: [
      { id: "a", text: "Signal and turn — the cyclist must stop for you", correct: false },
      { id: "b", text: "Signal, check mirror, shoulder check, and yield to the cyclist before turning", correct: true },
      { id: "c", text: "Swing wide left first to make the turn easier", correct: false },
    ],
    scenarioExplanation:
      "Right turns across bike lanes require yielding to cyclists and checking the blind spot — mirrors alone are not enough.",
    diagram: {
      kind: "left-turn-yield",
      title: "Turn and blind-spot zones",
      caption: "Signal early · shoulder check · yield on left turns.",
      callouts: ["Bike lane yield", "Shoulder glance", "Wheels straight while waiting", "100 ft signal"],
    },
    motion: {
      title: "Right turn with bike lane",
      description: "Mirror, shoulder, yield to cyclist, then turn tightly without swinging wide.",
      motion: "left-turn-yield",
    },
  },

  9: {
    id: "uncontrolled-intersections",
    title: "Uncontrolled intersections",
    keyPoints: [
      "No signs or signals means yield to any vehicle that entered before you.",
      "If you arrive together, yield to the driver on your right.",
      "Slow and cover the brake — uncontrolled does not mean uncontrolled speed.",
      "Pedestrians in crosswalks always have priority.",
    ],
    explanation: `Not every intersection has lights or stop signs. On uncontrolled approaches, California law treats the intersection as yield territory: slow down, scan all four directions, and be ready to stop. The first driver to enter the intersection lawfully generally proceeds first. When two arrive at the same time, yield to the vehicle on your right — the same tie-breaker as four-way stops.

Visibility matters more here because nobody has a assigned signal phase. Brush, parked trucks, and building corners hide cross traffic. Edge forward slowly until you can see, then proceed only when clear. Never assume a lack of signs means free passage — residential cut-throughs see serious T-bone crashes from rolling through.

Pedestrians and cyclists using crosswalks (marked or unmarked at intersections) still have right-of-way. Uncontrolled does not relax crosswalk rules. On hills or narrow streets, honking before blind corners is legal in California when reasonably necessary — but slowing and scanning come first.`,
    scenarioIntro: "You approach a residential intersection with no signs or signals.",
    scenarioSetup:
      "A sedan is approaching from your right at similar speed. Neither of you has stopped yet — both are slowing. A pedestrian waits at the corner but has not stepped off the curb.",
    scenarioPrompt: "Who should yield?",
    scenarioChoices: [
      { id: "a", text: "You, because the other car is on your right", correct: true },
      { id: "b", text: "The other car, because you are going straight", correct: false },
      { id: "c", text: "Neither — first to honk goes", correct: false },
    ],
    scenarioExplanation:
      "At uncontrolled intersections with simultaneous arrival, yield to the driver on your right after slowing for any pedestrians.",
    diagram: {
      kind: "four-way-stop",
      title: "Uncontrolled intersection approach",
      caption: "Slow · scan · yield to right · watch pedestrians.",
      callouts: ["No signs", "Yield to right", "Cover brake", "Crosswalk scan"],
    },
    motion: {
      title: "Yield at an open intersection",
      description: "Both slow; the driver on the right proceeds while you wait and scan.",
      motion: "four-way-yield",
    },
  },

  10: {
    id: "flashing-signals-arrows",
    title: "Flashing signals & arrows",
    keyPoints: [
      "Flashing red = stop, then proceed when safe — like a stop sign.",
      "Flashing yellow = slow down and proceed with caution — no stop required if clear.",
      "Protected green arrow = turn allowed; oncoming traffic is held.",
      "Solid green with no arrow = unprotected turn — yield to oncoming and pedestrians.",
    ],
    explanation: `Traffic signals have modes beyond solid red-yellow-green. A flashing red light requires a full stop behind the limit line, then you may proceed when the intersection is clear — identical to a stop sign. Flashing yellow warns of hazard or off-peak operation: reduce speed, stay alert, but stop only if needed for traffic or pedestrians.

Turn arrows add precision. A green arrow means your turn is protected — oncoming traffic faces red. A flashing yellow arrow (common in California) means left turns are allowed but unprotected: yield to oncoming vehicles and pedestrians, then turn when safe. Solid yellow arrow means the protected phase is ending — do not start a new turn if you can stop safely.

When signals go dark after power failure, treat the intersection as an all-way stop unless directed otherwise by an officer. Know the difference between protected and permissive turns — permit tests love scenarios where drivers turn left on solid green without yielding.`,
    scenarioIntro: "You approach a signal with a flashing yellow arrow for left turns.",
    scenarioSetup:
      "Oncoming traffic has a steady green. A pedestrian is in the crosswalk on the street you want to enter. Your light shows the flashing yellow arrow.",
    scenarioPrompt: "When may you turn left?",
    scenarioChoices: [
      { id: "a", text: "Immediately — the arrow means go", correct: false },
      { id: "b", text: "After yielding to oncoming traffic and the pedestrian", correct: true },
      { id: "c", text: "Only when the arrow turns solid green", correct: false },
    ],
    scenarioExplanation:
      "Flashing yellow arrow = permissive left turn. Yield to oncoming vehicles and pedestrians, then turn when a safe gap opens.",
    diagram: {
      kind: "traffic-signal",
      title: "Flashing and arrow phases",
      caption: "Flash red = stop · flash yellow = caution · yellow arrow = yield to turn.",
      callouts: ["Flashing red — stop", "Flashing yellow — slow", "Green arrow — protected", "Yellow arrow — yield"],
    },
    motion: {
      title: "Permissive left on flashing yellow arrow",
      description: "Wait for oncoming gap and clear crosswalk, then complete the turn smoothly.",
      motion: "signal-phases",
    },
  },

  11: {
    id: "warning-vs-guide-signs",
    title: "Warning vs guide signs",
    keyPoints: [
      "Warning signs are yellow diamonds with black symbols — they describe hazards ahead.",
      "Guide signs use green, blue, or brown rectangles for directions and services.",
      "Warning signs do not set speed limits but imply you should slow for conditions.",
      "Construction warnings use orange backgrounds — fines double in work zones.",
    ],
    explanation: `Section one covered sign shapes broadly; here we split warning from guide functions. Warning signs tell you what is coming — curves, merges, hills, crossings — so you can adjust before the hazard. They never carry enforceable speed numbers except advisory plates below some warnings. If you see 'Slippery When Wet,' the Basic Speed Law still governs how fast you may safely go.

Guide signs orient you. Green freeway guides list exits and distances; blue service signs show gas, food, lodging; brown signs mark parks and recreation. Missing an exit because you read too late causes panic lane changes — scan green boards early and move to the correct lane miles ahead.

Mixing them up fails tests and real trips. Yellow diamond = caution ahead. Green rectangle = where to go. Orange = workers present. When both appear together — say, a yellow merge warning before a green exit board — slow first, then navigate.`,
    scenarioIntro: "You are on a freeway approaching a complex interchange.",
    scenarioSetup:
      "A yellow diamond warns of a lane drop ahead. Farther on, green overhead signs list two exits half a mile apart. You need the second exit.",
    scenarioPrompt: "What is the correct order of actions?",
    scenarioChoices: [
      { id: "a", text: "Ignore the yellow sign — only green signs matter on freeways", correct: false },
      { id: "b", text: "Heed the merge warning, adjust speed and lane early, then follow green guide signs", correct: true },
      { id: "c", text: "Stop on the shoulder to read the green sign", correct: false },
    ],
    scenarioExplanation:
      "Warning signs demand speed and position changes before guide signs tell you which exit to take.",
    diagram: {
      kind: "traffic-signs",
      title: "Warning vs guide placement",
      caption: "Yellow first — adjust. Green next — navigate.",
      callouts: ["Yellow diamond — hazard", "Green — exits", "Orange — construction", "Advisory speed plates"],
    },
    motion: {
      title: "Reading signs in sequence",
      description: "Spot warning, slow and position, then follow guide signs to the correct exit.",
      motion: "sign-recognition",
    },
  },

  12: {
    id: "roundabouts-merges",
    title: "Roundabouts & merges",
    keyPoints: [
      "Yield to traffic already in the roundabout before entering.",
      "Travel counterclockwise; signal right before your exit.",
      "Do not stop inside the circle unless avoiding a collision.",
      "At merges, match speed and find a gap — never stop at end of ramp unless traffic demands it.",
    ],
    explanation: `Roundabouts replace some four-way stops with continuous flow. As you approach, slow and yield to pedestrians and vehicles already circulating. Enter when a safe gap appears and stay in your lane through the circle. Signal right after you pass the exit before yours. If you miss your exit, go around again — do not stop or back up in the circle.

California adds roundabouts gradually; some drivers unfamiliar with them hesitate incorrectly. Your job is predictable speed and clear signaling. Large trucks need extra room — do not squeeze beside them in multi-lane circles.

Merging differs: freeway on-ramps are acceleration lanes. Use them to match traffic speed, signal, mirror, shoulder check, and blend into a gap. Stopping at the ramp end unless traffic is stopped creates rear-end risk. If no gap appears, slow on the ramp but keep moving when possible. Yield lines mark where entering traffic must give way.`,
    scenarioIntro: "You enter a single-lane roundabout intending to take the third exit.",
    scenarioSetup:
      "Two cars are already circulating from your left. A pedestrian waits to cross at the entry crosswalk but has not entered it.",
    scenarioPrompt: "When do you enter?",
    scenarioChoices: [
      { id: "a", text: "Enter immediately — circulating traffic must stop for you", correct: false },
      { id: "b", text: "Yield to circulating vehicles and the pedestrian if they enter the crosswalk", correct: true },
      { id: "c", text: "Stop inside the circle until the pedestrian leaves the area", correct: false },
    ],
    scenarioExplanation:
      "Yield at entry to traffic in the roundabout and to pedestrians in the crosswalk. Enter only with a safe gap.",
    diagram: {
      kind: "left-turn-yield",
      title: "Roundabout flow",
      caption: "Yield on entry · counterclockwise · signal exit.",
      callouts: ["Yield line", "Circulating traffic", "Exit signal", "Pedestrian crosswalk"],
    },
    motion: {
      title: "Entering when clear",
      description: "Wait for gap, merge into circulation, signal before your exit.",
      motion: "left-turn-yield",
    },
  },

  13: {
    id: "school-buses",
    title: "School buses",
    keyPoints: [
      "Red flashing lights and extended stop arm = stop from either direction unless divided highway with median.",
      "Yellow flashing lights mean prepare to stop — do not pass.",
      "Stop at least 20 feet from the bus when required.",
      "Remain stopped until lights stop flashing and children are clear.",
    ],
    explanation: `School buses load and unload vulnerable passengers. When amber lights flash, slow and prepare to stop — children may be nearby. When red lights flash and the stop arm extends, drivers behind the bus must stop. Drivers approaching from the opposite direction must also stop unless the road is a divided highway with a raised median or two separate roadways — then opposing traffic may proceed with caution.

Stopping distance matters on two-lane roads: begin braking when you see yellow, not when red appears. Passing a stopped bus with red lights active is a serious violation with heavy fines and possible license suspension. Watch for children crossing after the bus — they may run from the front where you cannot see.

If you drive siblings to school, you are not a bus — normal traffic rules apply. But near bus stops in neighborhoods, scan for kids darting between parked cars.`,
    scenarioIntro: "You are behind a school bus on a two-lane neighborhood street.",
    scenarioSetup:
      "The bus activates yellow lights and begins slowing. No median separates lanes. Oncoming traffic is visible in the distance.",
    scenarioPrompt: "What should you do?",
    scenarioChoices: [
      { id: "a", text: "Pass quickly before red lights activate", correct: false },
      { id: "b", text: "Slow, prepare to stop at least 20 feet back, and stay stopped if reds flash", correct: true },
      { id: "c", text: "Change lanes to pass on the left immediately", correct: false },
    ],
    scenarioExplanation:
      "Yellow warns; red requires a full stop on undivided roads. Passing a bus loading children is illegal and dangerous.",
    diagram: {
      kind: "crosswalk",
      title: "School bus stop zone",
      caption: "Yellow = prepare · red + arm = stop 20 ft back.",
      callouts: ["Yellow lights", "Red lights & stop arm", "20-foot gap", "Divided highway exception"],
    },
    motion: {
      title: "Stopping for school bus",
      description: "Slow on yellow, halt on red, wait until lights off and kids are clear.",
      motion: "pedestrian-yield",
    },
  },

  14: {
    id: "school-work-zones",
    title: "School & work zones",
    keyPoints: [
      "School zone speed limits apply when children are present or lights flash — often 25 mph.",
      "Fines double in active construction zones when workers are present.",
      "Orange signs and cones mark changing lanes — merge early, not at the last cone.",
      "Watch for crossing guards with stop paddles — their directions override normal signals.",
    ],
    explanation: `School zones protect children walking and biking near campuses. Posted limits — commonly 25 mph — apply during school hours or when flashing beacons are active. 'When children are present' means reasonable belief kids are nearby, not only during bell times. Scan crosswalks, parked buses, and driveways even outside marked hours.

Work zones rearrange lanes overnight. Orange signs warn of flaggers, narrow lanes, and sudden stops. Merge where signs tell you — late merges cause rear-end chains. California doubles fines in highway construction zones when workers are present. Put the phone down; distracted driving in cones kills workers every year.

Crossing guards at school corners may stop traffic with hand-held signs. Obey them even if the light is green. In work zones, flaggers have the same authority — follow their gestures over generic signal rules.`,
    scenarioIntro: "You drive past a school at 3:15 p.m. on a weekday.",
    scenarioSetup:
      "Flashers on a 25 mph school zone sign are active. A crossing guard steps into the crosswalk with a stop paddle as students approach.",
    scenarioPrompt: "What is required?",
    scenarioChoices: [
      { id: "a", text: "Proceed at 25 mph if the light is green", correct: false },
      { id: "b", text: "Slow to 25 or lower and stop if the guard signals you to stop", correct: true },
      { id: "c", text: "Honk to warn students and maintain speed", correct: false },
    ],
    scenarioExplanation:
      "Active school zone limits and crossing guards control traffic — obey their signals regardless of other controls.",
    diagram: {
      kind: "speed-zone",
      title: "School and work zone markers",
      caption: "Flashers · orange cones · doubled fines.",
      callouts: ["25 mph when flashing", "Crossing guard paddle", "Merge early", "Workers present — fines x2"],
    },
    motion: {
      title: "Slowing for school zone",
      description: "Ease to posted limit, cover brake, stop for guard or children in crosswalk.",
      motion: "slow-for-conditions",
    },
  },

  15: {
    id: "exiting-freeways",
    title: "Exiting freeways",
    keyPoints: [
      "Move into the exit lane at least one mile before your exit in heavy traffic.",
      "Deceleration lanes let you slow after leaving the main flow — do not brake hard in travel lanes.",
      "Watch for slow or stopped traffic at ramp signals and meter lights.",
      "If you miss an exit, take the next one — never reverse or cross the gore point.",
    ],
    explanation: `Freeway exits combine high speed with tight geometry. Signage repeats distances: typically 1 mile, half mile, quarter mile. Lane discipline early prevents last-second cuts across gore areas — the striped triangle between through lanes and exit lanes. Crossing a gore is illegal and dangerous.

Use the deceleration lane to bleed speed after you leave the main lanes. Braking abruptly in the through lane surprises followers. Ramp curves may tighten to 35 mph or less — posted advisory speeds on yellow signs are for ideal conditions; slow more if wet.

Some California ramps have meter lights controlling merge onto surface streets. Stop at the line when red, proceed one at a time on green. Missing your exit is frustrating but safer than backing up — continue to the next exit and reroute.`,
    scenarioIntro: "You are in the center lane of a three-lane freeway.",
    scenarioSetup:
      "Overhead signs show your exit in half a mile. Traffic is moderate; the right lane is open but a car is pacing you on your right.",
    scenarioPrompt: "How should you prepare to exit?",
    scenarioChoices: [
      { id: "a", text: "Cross two lanes at the last second if needed", correct: false },
      { id: "b", text: "Signal early, check blind spot, and move right when a gap opens", correct: true },
      { id: "c", text: "Stop in the lane and wait for a large gap", correct: false },
    ],
    scenarioExplanation:
      "Plan lane changes early with signals and shoulder checks — never cross the gore or stop in travel lanes.",
    diagram: {
      kind: "freeway-merge",
      title: "Exit lane and deceleration zone",
      caption: "Move right early · slow on decel lane · never cross gore.",
      callouts: ["Advance signage", "Deceleration lane", "Gore area — no crossing", "Ramp advisory speed"],
    },
    motion: {
      title: "Smooth freeway exit",
      description: "Signal, merge to exit lane, then reduce speed on the deceleration ramp.",
      motion: "freeway-merge",
    },
  },

  16: {
    id: "curb-colors",
    title: "Curb colors",
    keyPoints: [
      "White = passenger loading only, usually brief stops.",
      "Green = limited time parking as posted.",
      "Yellow = load/unload freight or passengers — stay with vehicle unless signed otherwise.",
      "Red = no stopping; blue = disabled parking with valid placard.",
    ],
    explanation: `California curb colors communicate parking rules faster than reading every sign. White curbs allow quick passenger pick-up and drop-off — do not leave the car unattended for long. Green curbs permit timed parking; check posted minutes. Yellow curbs are for commercial loading and active passenger loading — drivers usually must stay with the vehicle.

Red curbs mean no stopping, standing, or parking — fire lanes and bus stops use red. Blue curbs reserve spaces for disabled placard or plate holders; never borrow someone else's placard. Unmarked curbs follow local default rules — often permit or time limits on street signs.

Misreading curb color gets expensive fast in cities like San Francisco or Los Angeles. Before parallel parking lesson practice, circle the block reading colors and signs together. Color tells the category; nearby signs give time limits and exceptions.`,
    scenarioIntro: "You need to drop off a friend at a storefront on a busy street.",
    scenarioSetup:
      "The only open space has a yellow curb with no other cars nearby. There is no sign showing hours, and you plan to run inside for one minute.",
    scenarioPrompt: "Can you park there?",
    scenarioChoices: [
      { id: "a", text: "Yes — yellow means general parking", correct: false },
      { id: "b", text: "Only if you stay with the vehicle for active loading; leaving it is likely illegal", correct: true },
      { id: "c", text: "Yes, if you flash your hazards", correct: false },
    ],
    scenarioExplanation:
      "Yellow curbs are for active loading/unloading with the driver present unless signs say otherwise — not for leaving the car.",
    diagram: {
      kind: "curb-colors",
      title: "California curb color chart",
      caption: "White · green · yellow · red · blue — each means something different.",
      callouts: ["White — passenger stop", "Green — timed park", "Yellow — load/unload", "Red — no stop", "Blue — disabled"],
    },
    motion: {
      title: "Reading the curb before you stop",
      description: "Scan color, confirm with signs, then park or load only if rules allow.",
      motion: "parallel-park",
    },
  },

  17: {
    id: "headlight-glare-fatigue",
    title: "Headlight glare & fatigue",
    keyPoints: [
      "Look toward the right edge of your lane when blinded by oncoming lights.",
      "Increase following distance at night — depth perception suffers.",
      "If tired, swap drivers or rest — caffeine is not a long-term fix.",
      "Keep interior lights dim so your eyes stay adapted to darkness.",
    ],
    explanation: `Night driving section one covered beam rules; here we focus on glare and fatigue — the hidden risks after sunset. Oncoming high beams can freeze your vision for seconds. Avoid staring at them; shift your gaze to the right fog line or lane edge until the vehicle passes, then recenter. If a driver behind you glare-blinds via mirrors, flip the night setting on the rearview mirror.

Fatigue slows reaction time like alcohol. On long practice drives home from events, watch for drifting, missed exits, or heavy eyelids. California rest areas and truck stops exist for a reason — a 20-minute nap beats pushing through. Provisional curfew rules for minors also limit late-night risk during the first year.

Clean headlights and windshields restore light output. Yellowed plastic lenses cut visibility for you and others. Ask your supervisor to check bulbs before extended night practice sessions.`,
    scenarioIntro: "You are driving home at 11 p.m. after a long school day.",
    scenarioSetup:
      "Oncoming SUVs with bright LEDs pass frequently. You notice you have drifted toward the center line twice and cannot remember the last mile marker.",
    scenarioPrompt: "What should you do?",
    scenarioChoices: [
      { id: "a", text: "Turn up music and open windows to push through", correct: false },
      { id: "b", text: "Pull off safely, rest or switch drivers, and use low beams properly", correct: true },
      { id: "c", text: "Follow closer to the car ahead to use their taillights as a guide", correct: false },
    ],
    scenarioExplanation:
      "Micro-sleeps and glare compound at night. Rest breaks and proper beam use are safety essentials, not optional.",
    diagram: {
      kind: "traffic-signal",
      title: "Managing glare and fatigue",
      caption: "Right-edge gaze · dim cabin · rest when drowsy.",
      callouts: ["Avoid oncoming glare", "Night mirror setting", "Rest stop break", "Clean lenses"],
    },
    motion: {
      title: "Recovering from glare",
      description: "Shift eyes to lane edge, let the vehicle pass, recentre when vision clears.",
      motion: "slow-for-conditions",
    },
  },

  18: {
    id: "sipde-space-management",
    title: "SIPDE & space management",
    keyPoints: [
      "Scan, Identify, Predict, Decide, Execute — repeat constantly.",
      "Identify escape routes — where would you steer if traffic stopped suddenly?",
      "Avoid target fixation — keep scanning after you spot one hazard.",
      "Communicate intentions with signals and lane position.",
    ],
    explanation: `Defensive driving is a loop, not a one-time checklist. SIPDE turns scanning into decisions: Scan the whole scene, Identify hazards (brake lights, child with ball, merging truck), Predict what might happen next, Decide your response, Execute smoothly. Expert drivers cycle SIPDE every few seconds without naming it.

Space management means keeping buffers on all sides when possible. If boxed in, drop speed slightly to open front gap. Identify escape paths — shoulder clearance, open lane, or median cut-through where legal. Staring at one problem — target fixation — makes you miss new ones entering from the side.

Predictability helps others defend around you. Signal early, hold steady speed in cruise zones, and avoid hovering in blind spots. On the permit test, SIPDE answers sound like 'slow down and cover the brake' — proactive, not reactive panic.`,
    scenarioIntro: "Traffic slows suddenly on the freeway ahead.",
    scenarioSetup:
      "You are in the middle lane with a car on your left and a truck close behind. Brake lights flash three cars ahead but you still have some room in front.",
    scenarioPrompt: "Using SIPDE, what is the best first action?",
    scenarioChoices: [
      { id: "a", text: "Swerve into the shoulder immediately", correct: false },
      { id: "b", text: "Identify the slowdown, ease off the gas, and increase front space while checking mirrors", correct: true },
      { id: "c", text: "Stare at the brake lights and brake hard at the last second", correct: false },
    ],
    scenarioExplanation:
      "Predict the chain reaction, decide to widen space, execute gradual slowing — that preserves escape options.",
    diagram: {
      kind: "speed-zone",
      title: "Space cushion and escape paths",
      caption: "Front gap · side clearance · mirror awareness.",
      callouts: ["Scan wide", "Predict chain reaction", "Front buffer", "Escape lane check"],
    },
    motion: {
      title: "Opening space under pressure",
      description: "Ease off gas, check mirrors, keep side clearance while traffic compresses ahead.",
      motion: "slow-for-conditions",
    },
  },

  19: {
    id: "fog-smoke-hydroplaning",
    title: "Fog, smoke & hydroplaning",
    keyPoints: [
      "Use low beams in fog — high beams reflect back and reduce visibility.",
      "Follow the right edge line if fog is dense; do not stop in a travel lane.",
      "Hydroplaning: ease off gas, steer straight, do not brake hard until grip returns.",
      "Wildfire smoke reduces traction and visibility — treat like dense fog.",
    ],
    explanation: `Weather section one covered rain basics; California adds coastal fog, wildfire smoke, and desert flash floods. In fog, slow to a speed where you can stop within the distance you see — often well below the limit. Low beams cut under the glare layer; high beams bounce light back at you. Use wipers and defrosters to keep glass clear.

If visibility drops near zero, pull completely off the road and stop — not in a lane or on the shoulder where tailgaters might hit you. Turn off driving lights if parked on the shoulder so others do not target-fix on your taillights.

Hydroplaning feels like the steering went light on wet pavement. Do not jerk the wheel or slam brakes — ease off the accelerator, keep straight, and let speed fall until tires bite again. Smoke from wildfires coats roads and lungs; keep windows closed on recirculate and drive slowly with lights on.`,
    scenarioIntro: "You descend into coastal fog on Highway 1 during practice.",
    scenarioSetup:
      "Visibility drops to about three car lengths. You are at 45 mph in a 55 zone. Oncoming traffic has headlights on low beam.",
    scenarioPrompt: "What speed and lighting are appropriate?",
    scenarioChoices: [
      { id: "a", text: "High beams and maintain 55 to minimize time in fog", correct: false },
      { id: "b", text: "Low beams and slow to a speed where you can stop within visible distance", correct: true },
      { id: "c", text: "Follow the car ahead closely to use their lights as a guide", correct: false },
    ],
    scenarioExplanation:
      "Fog demands low beams and speeds matched to sight distance — the Basic Speed Law overrides posted limits.",
    diagram: {
      kind: "speed-zone",
      title: "Low visibility techniques",
      caption: "Low beams · right-edge guide · stop off roadway if needed.",
      callouts: ["Low beams only", "Right fog line", "No lane stops", "Ease off gas if hydroplaning"],
    },
    motion: {
      title: "Driving in dense fog",
      description: "Reduce speed, low beams, follow edge line, pull off only when fully clear of traffic lanes.",
      motion: "slow-for-conditions",
    },
  },

  20: {
    id: "collision-reporting-skids",
    title: "Collision reporting & skids",
    keyPoints: [
      "Report to DMV (SR 1) within 10 days if injury, death, or damage over $1,000.",
      "Rear-wheel skid: steer gently in the direction the rear is sliding.",
      "Front-wheel skid (understeer): ease off gas, do not crank more steer.",
      "ABS may pulse the brake pedal — maintain firm steady pressure.",
    ],
    explanation: `Emergencies section one covered blowouts and brake failure; here we add reporting duties and skid recovery. After any crash, exchange information on scene. If anyone is hurt, killed, or property damage exceeds $1,000, file DMV Form SR 1 within 10 days even if police responded. Insurance claims are separate — both matter.

Skids happen when tires exceed available grip. In a rear-wheel skid (tail swings out), steer calmly toward the slide — if the rear goes right, steer right — and ease off gas. In understeer (front plows straight despite steering), reduce throttle and wait for front tires to regain grip before adding steer.

Anti-lock brakes feel like vibration under your foot — that is normal. Press firm and steady; do not pump ABS brakes. Practice skid talk with your supervisor in empty lots using low-speed maneuvers, never on public roads intentionally.`,
    scenarioIntro: "Light rain begins and your rear end steps out slightly in a curve.",
    scenarioSetup:
      "You feel the back of the car drift toward the shoulder at 35 mph. Your foot is still lightly on the gas.",
    scenarioPrompt: "How should you recover?",
    scenarioChoices: [
      { id: "a", text: "Brake hard and steer hard opposite the slide", correct: false },
      { id: "b", text: "Ease off gas and steer smoothly toward the direction the rear is sliding", correct: true },
      { id: "c", text: "Accelerate to pull straight", correct: false },
    ],
    scenarioExplanation:
      "Oversteer recovery means reducing throttle and steering into the skid smoothly — sudden brake or steer inputs worsen spins.",
    diagram: {
      kind: "railroad",
      title: "Skid recovery and reporting",
      caption: "Steer into rear slide · SR 1 if thresholds met · ABS steady pressure.",
      callouts: ["Rear skid steer", "Ease off gas", "SR 1 reporting", "ABS firm press"],
    },
    motion: {
      title: "Correcting a rear-wheel skid",
      description: "Lift throttle slightly, steer toward the slide, straighten as tires grip.",
      motion: "slow-for-conditions",
    },
  },

  21: {
    id: "dui-penalties-designated-driver",
    title: "DUI penalties & designated drivers",
    keyPoints: [
      "First DUI for adults can mean jail, fines over $10,000 total cost, and license suspension.",
      "Under-21 DUI or zero-tolerance stops can suspend your license on the first offense.",
      "Drugs — including prescription — count toward DUI if they impair you.",
      "Plan a sober ride before any event where alcohol appears.",
    ],
    explanation: `Alcohol section one explained BAC limits; section two covers consequences and planning. A first adult DUI in California triggers license suspension, fines, mandatory education, possible jail, and ignition interlock requirements. Total costs often exceed $10,000 with insurance spikes. For minors, even 0.01% on a preliminary test can mean a one-year suspension — no full DUI conviction required.

Impairment DUIs include legal drugs. If marijuana or prescription medication affects your driving, you can be arrested like alcohol DUI. Labels that warn against operating machinery include cars.

Designated driver plans work when chosen before anyone drinks — not whoever seems 'least drunk' at the end. Rideshare, transit, or sleeping over beat guessing sobriety. Hosts who take keys and offer couches prevent tragedies. On tests, answers that separate drinking from driving always win.`,
    scenarioIntro: "Friends want you to drive home from a party after you had one soda and they drank beer.",
    scenarioSetup:
      "They say you are the only one with a license present and claim they are 'fine.' It is midnight on a winding road.",
    scenarioPrompt: "What is the responsible choice?",
    scenarioChoices: [
      { id: "a", text: "Drive them because you did not drink alcohol", correct: false },
      { id: "b", text: "Refuse to transport impaired passengers unsafely — call a sober ride or stay put", correct: true },
      { id: "c", text: "Drive fast to shorten exposure time", correct: false },
    ],
    scenarioExplanation:
      "Sober drivers still fail if passengers distract or if you enable impaired friends to keep drinking — plan alternate rides.",
    diagram: {
      kind: "stop-sign",
      title: "DUI cost and prevention",
      caption: "Plan rides · zero tolerance under 21 · drugs count too.",
      callouts: ["Designated driver early", "Rideshare backup", "0.01% under 21", "Prescription impairment"],
    },
    motion: {
      title: "Choosing a sober ride",
      description: "Keys stay with the designated driver chosen before the first drink — not after.",
      motion: "slow-for-conditions",
    },
  },

  22: {
    id: "phone-mount-passengers",
    title: "Phone mounts & passenger rules",
    keyPoints: [
      "Mount phones where a glance does not block the road — center dash or low mount.",
      "Provisional drivers: no passengers under 20 without licensed adult 25+ for first year (with exceptions).",
      "Passenger conversations can distract — keep volume and emotion in check.",
      "Set Do Not Disturb while driving before you shift into drive.",
    ],
    explanation: `Distracted driving section one banned handheld use; here we cover setup and passenger distraction. If adults mount phones for navigation, place them at eye level near the dash — not on the steering wheel or blocking the windshield. One-second glances only; if you miss a turn, reroute safely, do not pinch-zoom while moving.

California provisional license holders under 18 face passenger restrictions during the first 12 months: no passengers under 20 unless a licensed driver 25 or older supervises, with limited exceptions for immediate family. Crowded cars multiply teen crash risk — know your restriction dates.

Passengers are distractions too. Loud music, arguments, and showing videos pull eyes and mind off the road. As driver, you set rules: belts on, phones away, volume down. If friends will not cooperate, do not move. Examiners ride alone, but habits start with peer pressure now.`,
    scenarioIntro: "You are 16 with a provisional license and three friends ask for a ride to lunch.",
    scenarioSetup:
      "All friends are 16. No adult 25+ is available. The trip is three miles on surface streets at noon.",
    scenarioPrompt: "Can you legally drive them?",
    scenarioChoices: [
      { id: "a", text: "Yes — short trips are exempt", correct: false },
      { id: "b", text: "No — provisional rules restrict under-20 passengers without a qualifying adult", correct: true },
      { id: "c", text: "Yes, if everyone buckles up", correct: false },
    ],
    scenarioExplanation:
      "During the first year of provisional licensing, under-20 passenger limits apply unless a 25+ licensed supervisor is present (family exceptions exist — know them).",
    diagram: {
      kind: "lane-change",
      title: "Distraction-free cockpit",
      caption: "Mounted GPS · DND on · passenger rules set.",
      callouts: ["Phone mount position", "Provisional passenger limits", "Do Not Disturb", "Driver sets rules"],
    },
    motion: {
      title: "Glance-only navigation",
      description: "Quick mount glance, eyes back to road — pull over to reprogram if needed.",
      motion: "lane-change",
    },
  },

  23: {
    id: "sr1-uninsured-motorist",
    title: "SR-1 forms & uninsured motorist",
    keyPoints: [
      "SR-1 required within 10 days for reportable crashes regardless of fault.",
      "Uninsured drivers face citation, vehicle impound, and personal liability.",
      "Uninsured motorist coverage protects you when the other driver has no insurance.",
      "Always photograph damage, positions, and license plates at the scene.",
    ],
    explanation: `Insurance section one covered exchange basics; section two adds DMV reporting and uninsured scenarios. Form SR-1 goes to the DMV when any crash involves injury, death, or property damage over $1,000. Both parties may need to file. Missing the deadline can suspend your license even if you were not at fault.

Driving uninsured in California brings tickets, impound fees, and suspension. You become personally liable for all damages — savings from skipping premiums vanish after one at-fault crash. When you shop policies with parents, understand uninsured motorist (UM) coverage pays your medical and repair bills if the at-fault driver has no insurance.

Documentation wins disputes. Photos of vehicle positions, skid marks, street signs, and plate numbers help insurers and investigators. Get witness contacts. Never admit fault on scene — stick to facts.`,
    scenarioIntro: "Someone rear-ends you at a light. Damage looks moderate but nobody is hurt.",
    scenarioSetup:
      "The other driver admits they have no insurance and asks you not to call police. Your bumper is cracked and the trunk will not latch.",
    scenarioPrompt: "What should you do?",
    scenarioChoices: [
      { id: "a", text: "Accept cash and leave without documentation", correct: false },
      { id: "b", text: "Call police if needed, exchange info, document damage, and file SR-1 if over $1,000", correct: true },
      { id: "c", text: "Drive away since you were not at fault", correct: false },
    ],
    scenarioExplanation:
      "Reportable damage requires proper exchange and likely SR-1 filing. Uninsured at-fault drivers still leave you needing records for insurance and DMV.",
    diagram: {
      kind: "four-way-stop",
      title: "Post-crash documentation",
      caption: "Photos · exchange info · SR-1 if thresholds met.",
      callouts: ["Plate photos", "Damage angles", "SR-1 deadline 10 days", "UM coverage"],
    },
    motion: {
      title: "Documenting the scene",
      description: "Safe position, photos, info exchange, then report to insurer and DMV if required.",
      motion: "four-way-yield",
    },
  },

  24: {
    id: "felony-hit-run-parking",
    title: "Felony hit-and-run & parking lots",
    keyPoints: [
      "Injury hit-and-run can be a felony with prison time — always stop and aid.",
      "Parking lot taps require locating the owner or leaving a detailed note.",
      "Security cameras and plate readers make fleeing pointless.",
      "Report to police when damage is significant or the owner cannot be found.",
    ],
    explanation: `Hit-and-run section one covered duty to stop; section two stresses severity and parking-lot specifics. Felony charges apply when someone is injured or killed and the driver flees. Misdemeanor property hit-and-run still carries jail, probation, and restitution. Turning yourself in promptly often reduces penalties versus being identified later.

Parking lots feel informal but laws apply. Slow speeds do not eliminate reporting duties. If you cannot find the owner, secure a note with name, phone, time, and brief description of what happened. Photograph both vehicles and the scene. Notify property security or police if damage is substantial.

Modern surveillance means 'nobody saw' fails in court. License plate readers and doorbell cameras identify vehicles daily. Ethical and legal duty align: stop, identify, report.`,
    scenarioIntro: "You bump a parked car while backing out of a mall space.",
    scenarioSetup:
      "The dent is fist-sized. The lot is busy but the other owner is not visible. You are late for work.",
    scenarioPrompt: "What fulfills your legal duty?",
    scenarioChoices: [
      { id: "a", text: "Leave because it is private property", correct: false },
      { id: "b", text: "Search for the owner; if unavailable, leave a visible note with contact info and report if needed", correct: true },
      { id: "c", text: "Move your car to another row so yours is not beside theirs", correct: false },
    ],
    scenarioExplanation:
      "Parking lots are not exempt — identify yourself or leave proper notice and document the incident.",
    diagram: {
      kind: "stop-sign",
      title: "Parking lot hit-and-run duties",
      caption: "Stop · find owner · note if absent · document.",
      callouts: ["Secure note", "Photo damage", "Report significant hits", "Felony if injury flee"],
    },
    motion: {
      title: "Handling a parking lot tap",
      description: "Stop, seek owner, leave detailed note, photograph, notify security or police if needed.",
      motion: "four-way-yield",
    },
  },

  25: {
    id: "temp-operating-permit",
    title: "Temporary operating permits",
    keyPoints: [
      "Dealers issue temporary operating permits for newly purchased vehicles — read expiry date.",
      "Private sales may require one-trip permits or towing if registration is not immediate.",
      "Keep bill of sale, title, and insurance proof with the vehicle during transfer.",
      "Smog and use tax must be cleared before permanent registration.",
    ],
    explanation: `Registration section one covered smog and fees; section two explains driving legally during the gap after purchase. Licensed dealers often provide temporary operating permits allowing a limited number of days to drive while registration processes. The pink or yellow slip must stay with the vehicle — expired temps mean stop driving until registered.

Private party sales differ: you cannot assume unlimited driving on the old owner's plates. California offers one-trip permits or you may need to tow the vehicle home until DMV completes transfer, smog, and insurance update. Driving unregistered risks impound even minutes after sale.

Organize paperwork immediately: signed title, bill of sale, smog certificate if required, proof of insurance in your name, and payment receipts for use tax. DMV field offices and online services reduce wait times when documents are complete.`,
    scenarioIntro: "You buy a car from a neighbor yesterday.",
    scenarioSetup:
      "The neighbor removed their plates. You have insurance starting today but registration appointment is next week. You want to drive to school Monday.",
    scenarioPrompt: "Can you drive Monday legally?",
    scenarioChoices: [
      { id: "a", text: "Yes, on the old plates if they look valid", correct: false },
      { id: "b", text: "Only if you have a valid temporary permit or completed registration — otherwise arrange legal transport", correct: true },
      { id: "c", text: "Yes, for one week grace period automatically", correct: false },
    ],
    scenarioExplanation:
      "No automatic grace period exists — you need proper temp permits or completed registration plus insurance.",
    diagram: {
      kind: "permit-journey",
      title: "Drive-away paperwork",
      caption: "Temp permit · insurance · title · smog before plates.",
      callouts: ["Temp OP expiry", "One-trip permit option", "Insurance active", "Registration appointment"],
    },
    motion: {
      title: "Legal drive after purchase",
      description: "Confirm temp permit or registration is valid before the first trip on public roads.",
      motion: "permit-journey",
    },
  },

  26: {
    id: "vehicle-maintenance-checks",
    title: "Vehicle maintenance checks",
    keyPoints: [
      "Tread depth minimum 1/32 inch legally, but replace sooner for wet traction.",
      "Check tire pressure monthly — door jamb sticker lists cold PSI.",
      "Brake squeal, pulling, or soft pedal need inspection before long trips.",
      "Lights, wipers, and fluids are pre-drive inspection items on the drive test.",
    ],
    explanation: `Driver safety section one covered belts and airbags; maintenance keeps those systems meaningful. Bald tires hydroplane early and fail California tread inspections. Use a penny test or tread wear indicators; replace tires in pairs or sets as recommended. Underinflated tires heat up and blow out on freeway grades common in California.

Brakes communicate problems: squealing pads, vibration, or a pedal that sinks signal service needs. Do not ignore warning lights — check engine, ABS, and oil pressure deserve immediate attention. Before the behind-the-wheel test, examiners may reject unsafe vehicles.

Weekly quick checks become habit: walk around for tire condition, test headlights and signals, confirm wiper fluid. Your supervisor should show you oil dipstick and coolant reservoir locations even if you are not doing changes yet.`,
    scenarioIntro: "You notice your steering pulls right and the front tires look smooth on the edges.",
    scenarioSetup:
      "A freeway trip is planned this weekend. Tread looks low but not completely bald. Pressure has not been checked in months.",
    scenarioPrompt: "What should happen before the trip?",
    scenarioChoices: [
      { id: "a", text: "Drive faster to minimize time on bad tires", correct: false },
      { id: "b", text: "Inspect tread and pressure, align/service as needed before highway driving", correct: true },
      { id: "c", text: "Only check tires after the trip if nothing blows", correct: false },
    ],
    scenarioExplanation:
      "Worn or underinflated tires fail suddenly at speed — service before long drives, not after.",
    diagram: {
      kind: "left-turn-yield",
      title: "Pre-trip inspection points",
      caption: "Tires · brakes · lights · fluids · wipers.",
      callouts: ["Tread depth", "Cold PSI check", "Brake feel", "Light walk-around"],
    },
    motion: {
      title: "Tire pressure check routine",
      description: "Gauge cold tires, compare to door sticker, inflate or service before driving.",
      motion: "slow-for-conditions",
    },
  },

  27: {
    id: "booster-seat-installation",
    title: "Booster seat installation",
    keyPoints: [
      "Booster seats position the lap belt on hips, shoulder belt on chest — never on neck.",
      "LATCH anchors secure harness seats; boosters use the vehicle seat belt.",
      "CHP and fire stations offer free car seat inspection appointments.",
      "Replace any seat after a moderate-or-severe crash per manufacturer guidance.",
    ],
    explanation: `Child safety section one covered age and stage rules; section two focuses on fit and installation. Booster seats exist because adult belts do not fit children under about 4'9". The lap portion must lie low on thighs, not the stomach; the shoulder strap crosses the chest, not the neck or behind the back.

Installation errors cause failures in crashes. Harness seats click into LATCH or belt paths with minimal wiggle at the base. Boosters simply guide the belt — read both vehicle and seat manual. Many California CHP offices inspect installs free; schedule before transporting cousins or babysitting charges.

After any significant crash, replace child seats even if damage is invisible — stress fractures weaken protection. Never use expired or unknown-history seats from thrift stores without research.`,
    scenarioIntro: "You install a booster for your 7-year-old cousin before a short errand.",
    scenarioSetup:
      "The shoulder belt rides up on the child's neck when they sit normally. The lap belt sits on the stomach when they slouch.",
    scenarioPrompt: "Is the booster adjusted correctly?",
    scenarioChoices: [
      { id: "a", text: "Yes — any belt position is fine in the back seat", correct: false },
      { id: "b", text: "No — adjust booster height/guides until lap belt is on hips and shoulder belt on chest", correct: true },
      { id: "c", text: "Put the shoulder belt behind the back to fix the neck issue", correct: false },
    ],
    scenarioExplanation:
      "Improper belt fit causes internal injuries in crashes — adjust or change seat stage until fit is correct.",
    diagram: {
      kind: "crosswalk",
      title: "Correct booster belt path",
      caption: "Lap on hips · shoulder on chest · no neck contact.",
      callouts: ["Hip belt low", "Chest belt path", "Booster guides", "CHP inspection"],
    },
    motion: {
      title: "Adjusting booster fit",
      description: "Raise guides, have child sit upright, verify belt paths before driving.",
      motion: "pedestrian-yield",
    },
  },

  28: {
    id: "mature-driver-program",
    title: "Mature driver program",
    keyPoints: [
      "California offers Mature Driver Improvement courses that may reduce insurance for seniors.",
      "Restricted licenses (daylight-only, geographic) keep some drivers mobile safely.",
      "Family should watch for new dents, tickets, or medical episodes affecting driving.",
      "Alternative transport preserves dignity when driving retirement is needed.",
    ],
    explanation: `Senior driving section one discussed vision and self-regulation; section two covers programs and transitions. The DMV Mature Driver Improvement Program refreshes rules for drivers 55 and older; completing an approved course may qualify for insurance discounts and updates knowledge on new laws like roundabouts and flashing yellow arrows.

When skills decline, restricted licenses allow limited driving — daytime only, within certain miles — instead of full loss of mobility. Doctors and family can initiate DMV reexamination if safety concerns arise. The goal is matching privilege to ability, not punishment.

Planning ahead beats crisis. Rideshare accounts, transit passes, and volunteer driver programs keep seniors connected. If you help grandparents, offer to drive for night appointments rather than criticizing their night vision — practical help opens honest conversations.`,
    scenarioIntro: "Your grandmother completed a Mature Driver course and asks what it did.",
    scenarioSetup:
      "She drives locally by day but avoids freeways. Her insurer mentioned a possible discount. She wonders if the course replaces a vision test at renewal.",
    scenarioPrompt: "What is accurate about the program?",
    scenarioChoices: [
      { id: "a", text: "It replaces all DMV testing forever", correct: false },
      { id: "b", text: "It refreshes skills and may reduce insurance but does not replace required renewals", correct: true },
      { id: "c", text: "It automatically restricts her to night driving only", correct: false },
    ],
    scenarioExplanation:
      "Mature Driver courses educate and may discount insurance — they supplement, not replace, DMV renewal requirements.",
    diagram: {
      kind: "speed-zone",
      title: "Senior mobility options",
      caption: "Refresh courses · restricted licenses · alternate rides.",
      callouts: ["Mature Driver course", "Daylight restriction option", "Insurance discount", "Transit alternatives"],
    },
    motion: {
      title: "Adapting driving habits",
      description: "Day routes, avoid peak glare hours, use courses to stay current on new rules.",
      motion: "slow-for-conditions",
    },
  },

  29: {
    id: "hov-clean-air-decals",
    title: "HOV lanes & clean air decals",
    keyPoints: [
      "HOV lanes require posted minimum occupants — usually two or three including driver.",
      "Clean Air Vehicle decals allow solo HOV use for qualifying plug-in/hybrid/electric vehicles.",
      "Decal colors and eligibility rules change — verify on DMV website before relying on them.",
      "Never cross double yellow HOV boundaries except at designated openings.",
    ],
    explanation: `Environmental driving section one mentioned smooth driving; section two covers HOV infrastructure. High-Occupancy Vehicle lanes move carpools and buses faster during peak hours. Signs state required occupants — '2+' means driver plus one passenger. Motorcycles and certain clean vehicles with valid decals may use HOV solo when authorized.

California issues Clean Air Vehicle decals in colors tied to eligibility tiers; rules shifted as electric adoption grew. Before assuming a family EV can solo in HOV, check current DMV decal application requirements and expiration. Fake or borrowed decals carry fines.

Enter and exit only at broken white lines or designated openings. Crossing double yellows to enter HOV is illegal and startles through traffic. If you are not eligible, stay out — patrols ticket single-occupant violators regularly in LA and Bay Area corridors.`,
    scenarioIntro: "You drive your family's plug-in hybrid with a green decal during rush hour.",
    scenarioSetup:
      "The HOV sign reads '2+ only.' You are alone. The decal was issued last year under rules you have not checked recently.",
    scenarioPrompt: "May you use the HOV lane solo?",
    scenarioChoices: [
      { id: "a", text: "Yes — any hybrid qualifies forever", correct: false },
      { id: "b", text: "Only if your vehicle and decal still meet current DMV clean air HOV rules", correct: true },
      { id: "c", text: "No — HOV always requires two people regardless of decals", correct: false },
    ],
    scenarioExplanation:
      "Decal eligibility is vehicle-specific and rule-dependent — confirm current DMV authorization before solo HOV use.",
    diagram: {
      kind: "freeway-merge",
      title: "HOV entry and decal rules",
      caption: "Check occupancy · valid decal · enter at openings only.",
      callouts: ["2+ signage", "Decal validity", "No double-yellow cross", "Verify DMV rules"],
    },
    motion: {
      title: "Legal HOV merge",
      description: "Confirm eligibility, signal, merge at broken line opening into carpool lane.",
      motion: "freeway-merge",
    },
  },

  30: {
    id: "practice-test-strategy",
    title: "Practice test strategy",
    keyPoints: [
      "Take multiple full-length practice exams — not just single-topic quizzes.",
      "Review every missed question against the handbook section cited.",
      "Simulate test conditions: timed, quiet, no phone, same time of day as real appointment.",
      "Weak topics cluster — if you miss three sign questions, reread the sign chapter entirely.",
    ],
    explanation: `Final review section one outlined test day basics; section two is tactical practice. Random quizzing feels productive but misses endurance — the real exam is 46 questions without hints. Block 45 minutes, score yourself, and treat 80% on practice as 'study more,' not 'ready.' California publishes sample tests; use them after you finish this course.

Missed questions reveal patterns. Three failures on right-of-way mean rereading that chapter and sketching intersection diagrams, not memorizing one answer. Keep a running list of 'trouble topics' and burn it down before scheduling retests — DMV fees add up.

Night-before cramming hurts sleep, which hurts recall. Instead, review your trouble list lightly, pack documents, and confirm appointment address. Morning-of, eat normally and arrive early. Confidence comes from repeated full passes, not one lucky practice score.`,
    scenarioIntro: "You scored 72% on a practice permit test — passing is about 83%.",
    scenarioSetup:
      "You missed four sign questions, two alcohol questions, and one school bus question. The real test is in five days.",
    scenarioPrompt: "How should you study next?",
    scenarioChoices: [
      { id: "a", text: "Retake the same practice test until you memorize answers", correct: false },
      { id: "b", text: "Reread handbook chapters on signs, alcohol, and school buses, then new full practice exams", correct: true },
      { id: "c", text: "Schedule the real test tomorrow before you forget anything", correct: false },
    ],
    scenarioExplanation:
      "Target weak chapters, then verify with fresh full exams — memorizing one test bank hides gaps the DMV will find.",
    diagram: {
      kind: "dmv-test-flow",
      title: "Practice loop",
      caption: "Full exam → review misses → handbook → repeat.",
      callouts: ["46-question sets", "Miss log by topic", "Handbook reread", "Pass consistently before booking"],
    },
    motion: {
      title: "Closing the gap to passing",
      description: "Identify weak topics, study chapters, retest until scores stay above 83%.",
      motion: "dmv-test-flow",
    },
  },
};
