import { Award, Bot, Building2, Drama, ChartColumnStacked, CircleSmall, Languages, Earth, HeartPulse, Microscope, Vote, Salad, PlaneTakeoff } from "lucide-react";
import { NewsArticleCategory, NewsArticleI } from "./types";

const categories = [
  {name: "Business", icon: Building2},
  {name: "Entertainment", icon: Drama},
  {name: "General", icon: CircleSmall},
  {name: "Health", icon: HeartPulse},
  {name: "Science", icon: Microscope},
  {name: "Sports", icon: Award},
  {name: "Technology", icon: Bot},
  {name: "Politics", icon: Vote},
  {name: "Food", icon: Salad},
  {name: "Travel", icon: PlaneTakeoff},
];

const getCategories = () => {
  return categories.map((category) => ({
      title: category.name,
      code: NewsArticleCategory[category.name as keyof typeof NewsArticleCategory],
      icon: category.icon,
  }));
}

const languages = [
  { name: "Arabic", code: "ar" },
  { name: "Bulgarian", code: "bg" },
  { name: "Bengali", code: "bn" },
  { name: "Czech", code: "cs" },
  { name: "Danish", code: "da" },
  { name: "German", code: "de" },
  { name: "Greek", code: "el" },
  { name: "English", code: "en" },
  { name: "Spanish", code: "es" },
  { name: "Estonian", code: "et" },
  { name: "Persian (Farsi)", code: "fa" },
  { name: "Finnish", code: "fi" },
  { name: "French", code: "fr" },
  { name: "Hebrew", code: "he" },
  { name: "Hindi", code: "hi" },
  { name: "Croatian", code: "hr" },
  { name: "Hungarian", code: "hu" },
  { name: "Indonesian", code: "id" },
  { name: "Italian", code: "it" },
  { name: "Japanese", code: "ja" },
  { name: "Korean", code: "ko" },
  { name: "Lithuanian", code: "lt" },
  { name: "Dutch", code: "nl" },
  { name: "Norwegian", code: "no" },
  { name: "Polish", code: "pl" },
  { name: "Portuguese", code: "pt" },
  { name: "Romanian", code: "ro" },
  { name: "Russian", code: "ru" },
  { name: "Slovak", code: "sk" },
  { name: "Swedish", code: "sv" },
  { name: "Tamil", code: "ta" },
  { name: "Thai", code: "th" },
  { name: "Turkish", code: "tr" },
  { name: "Ukrainian", code: "uk" },
  { name: "Vietnamese", code: "vi" },
  { name: "Chinese", code: "zh" }
];


const regions = [
  { name: "Argentina", code: "ar" },
  { name: "Armenia", code: "am" },
  { name: "Australia", code: "au" },
  { name: "Austria", code: "at" },
  { name: "Belarus", code: "by" },
  { name: "Belgium", code: "be" },
  { name: "Bolivia", code: "bo" },
  { name: "Brazil", code: "br" },
  { name: "Bulgaria", code: "bg" },
  { name: "Canada", code: "ca" },
  { name: "Chile", code: "cl" },
  { name: "China", code: "cn" },
  { name: "Colombia", code: "co" },
  { name: "Croatia", code: "hr" },
  { name: "Czechia", code: "cz" },
  { name: "Ecuador", code: "ec" },
  { name: "Egypt", code: "eg" },
  { name: "France", code: "fr" },
  { name: "Germany", code: "de" },
  { name: "Greece", code: "gr" },
  { name: "Honduras", code: "hn" },
  { name: "Hong Kong", code: "hk" },
  { name: "India", code: "in" },
  { name: "Indonesia", code: "id" },
  { name: "Iran", code: "ir" },
  { name: "Ireland", code: "ie" },
  { name: "Israel", code: "il" },
  { name: "Italy", code: "it" },
  { name: "Japan", code: "jp" },
  { name: "Korea", code: "kr" },
  { name: "Mexico", code: "mx" },
  { name: "Netherlands", code: "nl" },
  { name: "New Zealand", code: "nz" },
  { name: "Nicaragua", code: "ni" },
  { name: "Pakistan", code: "pk" },
  { name: "Panama", code: "pa" },
  { name: "Peru", code: "pe" },
  { name: "Poland", code: "pl" },
  { name: "Portugal", code: "pt" },
  { name: "Qatar", code: "qa" },
  { name: "Romania", code: "ro" },
  { name: "Russia", code: "ru" },
  { name: "Saudi Arabia", code: "sa" },
  { name: "South Africa", code: "za" },
  { name: "Spain", code: "es" },
  { name: "Switzerland", code: "ch" },
  { name: "Syria", code: "sy" },
  { name: "Taiwan", code: "tw" },
  { name: "Thailand", code: "th" },
  { name: "Turkey", code: "tr" },
  { name: "Ukraine", code: "ua" },
  { name: "United Kingdom", code: "gb" },
  { name: "United States Of America", code: "us" },
  { name: "Uruguay", code: "uy" },
  { name: "Venezuela", code: "ve" },
];

export const sidebarItems = [
    {
      title: "Categories",
      icon: ChartColumnStacked,
      childItems: getCategories(),
    },
    {
      title: "Language",
      icon: Languages,
      dropdownItems: languages,
      defaultValue: "en"
    },
    {
      title: "Region",
      icon: Earth,
      dropdownItems: regions,
      defaultValue: "us"
    }
];



export const temp: NewsArticleI[] = [{
  uuid: '2b596868-f6bf-4015-97fa-87d026af21b9',
  title: "Judge Rules Trump Can't Reject Asylum Seekers",
  description: "A federal judge prohibited the Trump administration on Wednesday from unilaterally expelling people seeking asylum in the US, ruling that the president doesn't ...",
  keywords: 'President Trump, asylum-seeker',
  snippet: "A federal judge prohibited the Trump administration on Wednesday from unilaterally expelling people seeking asylum in the US, ruling that the president doesn't ...",
  url: 'https://www.newser.com/story/371291/judge-rules-trump-cant-reject-asylum-seekers.html',
  image_url: 'https://img2-azrcdn.newser.com/image/1620061-12-20250702184201.jpeg',
  language: 'en',
  published_at: '2025-07-03T00:42:00.000000Z',
  source: 'newser.com',
  categories: [ NewsArticleCategory.General, NewsArticleCategory.Politics ],
  relevance_score: null
},
{
  uuid: '32eda219-c7b6-47aa-8645-840e4fdc114d',
  title: 'Slumping Mets bump Francisco Lindor from leadoff spot',
  description: 'Francisco Lindor was dropped from the leadoff spot for the first time in 191 consecutive starts Wednesday night with the New York Mets in a major tailspin.',
  keywords: '',
  snippet: 'Open Extended Reactions\n' +
    '\n' +
    'NEW YORK -- Francisco Lindor was dropped from the leadoff spot Wednesday night with the New York Mets in a major tailspin.\n' +
    '\n' +
    'After makin...',
  url: 'https://www.espn.com/mlb/story/_/id/45649816/slumping-mets-bump-francisco-lindor-leadoff-spot',
  image_url: 'https://a2.espncdn.com/combiner/i?img=%2Fphoto%2F2025%2F0416%2Fr1479614_1296x729_16%2D9.jpg',
  language: 'en',
  published_at: '2025-07-03T00:41:13.000000Z',
  source: 'espn.com',
  categories: [ NewsArticleCategory.Sports, NewsArticleCategory.General ],
  relevance_score: null
},
{
  uuid: '6b117fb8-2061-4834-bbb5-6955e6584d04',
  title: 'Red Panda has broken wrist, is out of hospital after fall',
  description: "Red Panda's recovery should take a few months, her agency said the day after she fell off her unicycle and crashed to the court during halftime of the WNBA Comm...",
  keywords: '',
  snippet: 'Pat McAfee and his crew send love to Red Panda, who was injured in a fall during her performance at halftime of the Lynx-Fever game. (2:11)\n' +
    '\n' +
    'Good news, basketba...',
  url: 'https://www.espn.com/wnba/story/_/id/45649875/red-panda-broken-wrist-hospital-fall',
  image_url: 'https://a1.espncdn.com/combiner/i?img=%2Fphoto%2F2017%2F0606%2Fr215919_1296x729_16%2D9.jpg',
  language: 'en',
  published_at: '2025-07-03T00:41:13.000000Z',
  source: 'espn.com',
  categories: [ NewsArticleCategory.Sports, NewsArticleCategory.General ],
  relevance_score: null
},
  {
    uuid: '099f0ee8-171c-4c6e-8873-9017c3c95313',
    title: 'The AI-Generated Barbie Taking Over Instagram',
    description: 'Meet DollyDoesVlogs, the AI-animated Barbie doll going viral on Instagram. With 179K followers and rising, she’s at the center of a $7B virtual influencer boo...',
    keywords: '',
    snippet: 'Meet @DollyDoesVlogs, the Instagram account that’s quickly turning heads. With just 20 posts and over 179,000 followers, this AI-animated character is gaining...',
    url: 'https://whatstrending.com/meet-the-ai-generated-unhinged-barbie-doll-going-viral-on-instagram/',
    image_url: 'https://whatstrending.com/wp-content/uploads/2025/07/BLU_A82471711-scaled-e1751590706703.jpg',     
    language: 'en',
    published_at: '2025-07-04T03:21:58.000000Z',
    source: 'whatstrending.com',
    categories: [ NewsArticleCategory.General, NewsArticleCategory.Entertainment ],
    relevance_score: null
  },
  {
    uuid: '84ea5c8b-a9dc-4e02-8284-4b023d13eed9',
    title: "Freddie Freeman drives in Ohtani & Betts with second double to extend Dodgers' lead vs. White Sox",    
    description: "Freddie Freeman drove in Shohei Ohtani and Mookie Betts with his second double of the game that extended the Los Angeles  Dodgers' lead against the Chicago Whit...",
    keywords: '',
    snippet: 'my favs\n\nDISMISS\n\nAccess and manage your favorites here',
    url: 'https://www.foxsports.com/watch/fmc-a6uc67y4phv0l0m5',
    image_url: 'https://a57.foxsports.com/static-media.fox.com/fmc/prod/sports/VX-13227846/1280/720/8dq7mqemqptpo04y.jpg?ve=1&tl=1',
    language: 'en',
    published_at: '2025-07-04T03:20:51.000000Z',
    source: 'api.foxsports.com',
    categories: [ NewsArticleCategory.Sports ],
    relevance_score: null
  },
  {
    uuid: 'c997d890-c8d1-4e2b-b82d-d9ecac6f30d8',
    title: 'Donald Trump wants to stage UFC fight at White House',
    description: "President Donald Trump said Thursday that he's thinking of staging a UFC match on the White House grounds with upwards of 20,000 spectators to celebrate 250 y...",
    keywords: '',
    snippet: "DES MOINES, Iowa — U.S. President Donald Trump said Thursday that he's thinking of staging a UFC match on the White House grounds with upwards of 20,000 spect...",
    url: 'https://www.sportsnet.ca/ufc/article/donald-trump-wants-to-stage-ufc-fight-at-white-house/',
    image_url: 'https://www.sportsnet.ca/wp-content/uploads/2025/07/CP174717108.jpg',
    language: 'en',
    published_at: '2025-07-04T03:20:17.000000Z',
    source: 'sportsnet.ca',
    categories: [ NewsArticleCategory.Sports ],
    relevance_score: null
  },
  {
    uuid: 'f65fce04-e0fb-43d8-a041-69c21b6ed646',
    title: "Ringo Starr on Sam Mendes Beatles Biopic: 'We Would Never Do That'",
    description: 'Ringo Starr shared why he asked Sam Mendes for changes to the Beatles biopic, including how the script portrayed his first wife Maureen Starkey Tigrett',
    keywords: '',
    snippet: 'Ringo Starr had strong opinions about how he’ll be portrayed in the four upcoming Beatles biopics.\n' +
      '\n' +
      'The musician, 84, told The New York Times on Wednesday, Ju...',
    url: 'https://www.usmagazine.com/entertainment/news/ringo-starr-on-sam-mendes-beatles-biopic-we-would-never-do-that/',
    image_url: 'https://www.usmagazine.com/wp-content/uploads/2025/07/GettyImages-2201196011Ringo-Starr-Shares-Why-He-Asked-Sam-Mendes-to-Make-Changes-to-Beatles-Biopic.jpg?crop=418px%2C268px%2C725px%2C381px&resize=1200%2C630&quality=86&strip=all',
    language: 'en',
    published_at: '2025-07-04T03:11:08.000000Z',
    source: 'usmagazine.com',
    categories: [ NewsArticleCategory.Entertainment, NewsArticleCategory.General ],
    relevance_score: null,
    locale: 'us'
  },
  {
    uuid: 'fabcf0ae-5906-4038-b4ac-ac1cf613a125',
    title: 'Vigilantes deliver street justice to brute who grabbed, attacked woman on NYC subway platform, dramatic video shows',
    description: 'Fredrick Marshall, 42, a complete stranger, allegedly followed the 20-year-old woman onto the Manhattan-bound J train platform at the Norwood Avenue in Cypress ...',
    keywords: 'Metro, US News, assaults, brooklyn, subways',
    snippet: 'Wild new video shows the moment a crew of vigilantes delivered street justice to a brute who grabbed and bear-hugged a young woman at a Brooklyn subway station ...',
    url: 'https://nypost.com/2025/07/03/us-news/nyc-vigilantes-deliver-street-justice-to-brute-who-grabbed-attacked-woman-on-subway-platform-video/',
    image_url: 'https://nypost.com/wp-content/uploads/sites/2/2025/07/good-sams-take-caught-video-107572518.jpg?quality=75&strip=all&w=1024',
    language: 'en',
    published_at: '2025-07-04T03:02:09.000000Z',
    source: 'nypost.com',
    categories: [ NewsArticleCategory.General ],
    relevance_score: null,
    locale: 'us'
  },
  {
    uuid: '98b4736c-9e13-4da1-954d-68308a8f346e',
    title: '$167.3M Powerball winner, 50, exposed as a career criminal who spent 30 years in jail before striking it rich: report',
    description: 'The winner of Kentucky’s largest lottery jackpot who was arrested in Florida days after claiming his riches has a 16-page rap sheet and decades-long criminal ...',
    keywords: 'US News, arrest, dumbest criminals, florida, kentucky, lottery',
    snippet: 'He’s flush with cash — and mug shots.\n' +
      '\n' +
      'The winner of Kentucky’s largest lottery jackpot who was arrested in Florida days after claiming his riches has a 1...',
    url: 'https://nypost.com/2025/07/03/us-news/167-3m-powerball-winner-50-exposed-as-a-career-criminal-who-spent-30-years-in-jail-before-striking-it-rich-report/',
    image_url: 'https://nypost.com/wp-content/uploads/sites/2/2025/07/lottery-comp.jpg?quality=75&strip=all&w=1024',
    language: 'en',
    published_at: '2025-07-04T02:26:40.000000Z',
    source: 'nypost.com',
    categories: [ NewsArticleCategory.General ],
    relevance_score: null,
    locale: 'us'
  }
];

export const similarNewsHardCoded: NewsArticleI[] = [
  {
      "uuid": "ab1a1509-4cb0-46bd-81b4-cb0a594f68d5",
      "title": "All-Star Starter Francisco Lindor Dropped From Leadoff Spot During Mets Slump",
      "description": "On the same day he got elected as an All-Star Game starter for the first time, Francisco Lindor was dropped from the New York Mets' leadoff spot.",
      "keywords": "",
      "snippet": "New York Mets All-Star Starter Francisco Lindor Dropped From Leadoff Spot During Mets Slump Updated Jul. 2, 2025 10:10 p.m. ET share facebook x reddit link\n\nThe...",
      "url": "https://www.foxsports.com/stories/mlb/with-the-mets-in-a-tailspin-slumping-allstar-francisco-lindor-dropped-from-leadoff-spot",
      "image_url": "https://a57.foxsports.com/statics.foxsports.com/www.foxsports.com/content/uploads/2025/07/1408/814/francisco_lindor_horizontal.jpg?ve=1&tl=1",
      "language": "en",
      "published_at": "2025-07-03T02:10:24.000000Z",
      "source": "api.foxsports.com",
      "categories": [
          NewsArticleCategory.Sports
      ],
      "relevance_score": 142.39952
  },
  {
      "uuid": "a59f0e6a-ef57-4a0c-9078-a1784adadf85",
      "title": "Mets' Francisco Lindor blasts leadoff home run against Cubs",
      "description": "Francisco Lindor gave the New York Mets an early lead with a leadoff home run against the Chicago Cubs.",
      "keywords": "",
      "snippet": "my favs\n\nDISMISS\n\nAccess and manage your favorites here",
      "url": "https://www.foxsports.com/watch/fmc-y9vihbxvp32w80v3",
      "image_url": "https://a57.foxsports.com/static-media.fox.com/fmc/prod/sports/VX-12769021/1280/720/ajb51f95ejj56kcy.jpg?ve=1&tl=1",
      "language": "en",
      "published_at": "2025-05-10T00:40:18.000000Z",
      "source": "api.foxsports.com",
      "categories": [
          NewsArticleCategory.Sports
      ],
      "relevance_score": 111.821236
  },
  {
      "uuid": "a1fe95cb-2c35-458b-9677-1764c65be049",
      "title": "Mets' Francisco Lindor crushes a leadoff homer vs Dodgers",
      "description": "The New York Mets' Francisco Lindor crushed a lead-off homer vs. the Dodgers.",
      "keywords": "",
      "snippet": "my favs\n\nDISMISS\n\nAccess and manage your favorites here",
      "url": "https://www.foxsports.com/watch/fmc-ihszz5dgp4xedu52",
      "image_url": "https://a57.foxsports.com/static-media.fox.com/fmc/prod/sports/bec41cf2-af19-41ca-a2a5-e3c2460104c1/1280/720/2s83dxox8gt6v3se.jpg?ve=1&tl=1",
      "language": "en",
      "published_at": "2025-06-03T02:21:04.000000Z",
      "source": "api.foxsports.com",
      "categories": [
          NewsArticleCategory.Sports
      ],
      "relevance_score": 97.54599
  }
];

export const tempTopNews: NewsArticleI[] = [
  {
    uuid: 'df4fe998-31fe-4215-9762-e6ca2bd7a26b',
    title: "'That's a Misrepresentation': Ex-GN'R Manager Reveals What People Get Wrong About Axl Rose, Recalls No One Wanting to Manage Them",
    description: "'There were moments of harmony.'",
    keywords: 'guns n roses, alan niven',
    snippet: "Alan Niven, famous rock manager, reflected on his work with Guns N' Roses, addressing some of the misconceptions about his involvement with the band.\n" +
      '\n' +
      'With an i...',
    url: 'https://www.ultimate-guitar.com/news/general_music_news/thats-a-misrepresentation-ex-gnr-manager-reveals-what-people-get-wrong-about-axl-rose-recalls-no-one-wanting-to-manage-them/',
    image_url: 'https://www.ultimate-guitar.com/static/article/news/5/180035_0_wide_ver1751575239.jpg',
    language: 'en',
    published_at: '2025-07-04T00:40:39.000000Z',
    source: 'ultimate-guitar.com',
    categories: [ NewsArticleCategory.General ],
    relevance_score: null
  },
  {
    uuid: '8fc45d0a-73da-45d6-8816-f7b0e9f0cb77',
    title: 'Formula1 2025 British Grand Prix Drivers Press Conference 1080p AHDTV x264-DARKSPORT – ReleaseBB',     
    description: '',
    keywords: '',
    snippet: 'Formula1 2025 British Grand Prix Drivers Press Conference 1080p AHDTV x264-DARKSPORT Posted on July 4th, 2025 at 2:10 am in TV Shows by Robotnico Links: HOMEPAG...',
    url: 'https://post.rlsbb.cc/formula1-2025-british-grand-prix-drivers-press-conference-1080p-ahdtv-x264-darksport/',
    image_url: 'https://post.rlsbb.cc/wp-content/uploads/2021/02/favicon.ico',
    language: 'en',
    published_at: '2025-07-04T00:40:36.000000Z',
    source: 'rlsbb.ru',
    categories: [ NewsArticleCategory.Sports ],
    relevance_score: null
  },
  {
    uuid: 'f531dbbc-f62d-4070-92a2-92c5474d4bb2',
    title: 'Days After Jake Paul Bout, Boxer Is Arrested by ICE',
    description: 'Julio César Chávez Jr., a Mexican boxer who fought a high-profile match against Jake Paul last weekend, has been arrested in California by ICE agents and face...',
    keywords: 'Immigration and Customs Enforcement, California, Mexico, boxers',
    snippet: 'Julio César Chávez Jr., a Mexican boxer who fought a high-profile match against Jake Paul last weekend, has been arrested in California by ICE agents and face...',
    url: 'https://www.newser.com/story/371356/days-after-jake-paul-bout-boxer-is-arrested-by-ice.html',
    image_url: 'https://img2-azrcdn.newser.com/image/1620295-12-20250703185931.jpeg',
    language: 'en',
    published_at: '2025-07-04T00:40:00.000000Z',
    source: 'newser.com',
    categories: [ NewsArticleCategory.General, NewsArticleCategory.Politics ],
    relevance_score: null
  },
  {
    uuid: 'eb3550cc-3678-42fb-8846-d9332ee1285d',
    title: 'Paul Simon Recovering From Successful Back Surgery After Canceling Tour Dates',
    description: 'Paul Simon is on the mend after canceling two shows from his A Quiet Celebration tour to undergo minor back surgery.',
    keywords: '',
    snippet: 'Paul Simon is on the mend after canceling two shows from his A Quiet Celebration tour to undergo minor back surgery.\n' +
      '\n' +
      'On Thursday, the 16x Grammy winner updated...',
    url: 'https://deadline.com/2025/07/paul-simon-recovering-successful-back-surgery-1236449493/',
    image_url: 'https://deadline.com/wp-content/uploads/2025/02/Paul-Simon.jpg?w=1024',
    language: 'en',
    published_at: '2025-07-04T00:29:05.000000Z',
    source: 'deadline.com',
    categories: [ NewsArticleCategory.Entertainment ],
    relevance_score: null,
    locale: 'us'
  },
  {
    uuid: 'a48e71a0-e0ac-4205-aaff-fa252768b078',
    title: "Reporter's Notebook: Gov. Wes Moore on having faith",
    description: '"CBS Evening News" co-anchor John Dickerson shares a conversation he had with Maryland Gov. Wes Moore at the Aspen Ideas Festival. Asked if he turns to a saying...',
    keywords: 'Maryland, Wes Moore',
    snippet: `Reporter's Notebook: Gov. Wes Moore on having faith "CBS Evening News" co-anchor John Dickerson shares a conversation he had with Maryland Gov. Wes Moore at the...`,
    url: 'https://www.cbsnews.com/video/reporters-notebook-gov-wes-moore-on-having-faith/',
    image_url: 'https://assets3.cbsnewsstatic.com/hub/i/r/2025/07/04/2f58d45c-cbd6-48f2-9b28-3b3ad691d2bc/thumbnail/1200x630/14bd525db00822be1457b3807b6b48d8/cbsn-fusion-reporters-notebook-gov-wes-moore-on-having-faith-thumbnail.jpg',
    language: 'en',
    published_at: '2025-07-04T00:25:37.000000Z',
    source: 'cbsnews.com',
    categories: [ NewsArticleCategory.General, NewsArticleCategory.Politics ],
    relevance_score: null,
    locale: 'us'
  },
  {
    uuid: '565c282e-0687-46bc-b765-7c62589aeb65',
    title: 'Why staffing cuts to national parks could pose safety concerns for summer visitors',
    description: 'At the Assateague Island National Seashore in Maryland, visitors this summer are seeing shuttered lifeguard towers and signs warning that no lifeguards are on d...',
    keywords: 'Maryland, Department of Government Efficiency, National Park Service, Trump Administration, Lifeguard',
    snippet: "Assateague Island, Maryland — The shoreline of Maryland's Assateague Island is a familiar place for surfer Zack Tyndall.\n" +
      '\n' +
      'A former firefighter paramedic, Tynd...',
    url: 'https://www.cbsnews.com/news/staffing-cuts-national-parks-safety-concerns-summer-visitors/',
    image_url: 'https://assets1.cbsnewsstatic.com/hub/i/r/2025/07/04/cdf3c50d-d976-4636-a2f2-4d41682f1f1c/thumbnail/1200x630/d5310650aa663756434dee4292215b24/1751588475937.png',
    language: 'en',
    published_at: '2025-07-04T00:24:46.000000Z',
    source: 'cbsnews.com',
    categories: [ NewsArticleCategory.General, NewsArticleCategory.Politics ],
    relevance_score: null,
    locale: 'us'
  }
]