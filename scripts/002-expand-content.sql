-- Expand articles table with new columns
ALTER TABLE articles ADD COLUMN IF NOT EXISTS published_date DATE;
ALTER TABLE articles ADD COLUMN IF NOT EXISTS country TEXT;
ALTER TABLE articles ADD COLUMN IF NOT EXISTS region TEXT;
ALTER TABLE articles ADD COLUMN IF NOT EXISTS read_time INTEGER DEFAULT 5;
ALTER TABLE articles ADD COLUMN IF NOT EXISTS tags TEXT[];

-- Drop the existing check constraint on category to allow new categories
ALTER TABLE articles DROP CONSTRAINT IF EXISTS articles_category_check;

-- Update existing articles with dates, countries, and regions
UPDATE articles SET published_date = '1914-08-01', country = 'Tanzania', region = 'East Africa' WHERE slug = 'the-forgotten-front-of-east-africa';
UPDATE articles SET published_date = '1920-01-10', country = 'Switzerland', region = 'Europe' WHERE slug = 'how-the-league-of-nations-failed-africa';
UPDATE articles SET published_date = '1939-09-01', country = 'Multiple', region = 'Global' WHERE slug = 'african-soldiers-in-world-war-ii';
UPDATE articles SET published_date = '1960-01-01', country = 'Multiple', region = 'Africa' WHERE slug = 'the-year-africa-changed-forever-1960';
UPDATE articles SET published_date = '1949-04-28', country = 'United Kingdom', region = 'Global' WHERE slug = 'the-commonwealth-partnership-or-neo-colonialism';
UPDATE articles SET published_date = '1884-11-15', country = 'Germany', region = 'Europe' WHERE slug = 'the-berlin-conference-dividing-a-continent';

-- Insert 28 new articles covering global, Africa, Europe, Nigeria, Grammy, Guinness, and more
INSERT INTO articles (title, slug, excerpt, content, category, is_featured, published, author, published_date, country, region, read_time, tags) VALUES

-- NIGERIA
(
  'Nigeria''s Path to Independence: October 1, 1960',
  'nigerias-path-to-independence',
  'How Nigeria''s diverse ethnic groups united to break free from British colonial rule on October 1, 1960, becoming Africa''s most populous independent nation.',
  '<p>Nigeria''s journey to independence on October 1, 1960, is one of the most complex stories in African decolonization. With over 250 ethnic groups speaking more than 500 languages, the territory the British cobbled together in 1914 was never a natural nation-state.</p><p>The road began in earnest after WWII, when returning soldiers and educated elites demanded self-governance. Leaders like Nnamdi Azikiwe, Obafemi Awolowo, and Ahmadu Bello represented the three major regions — East, West, and North — each with different visions for the new nation.</p><p>The Richards Constitution of 1946, the Macpherson Constitution of 1951, and the Lyttleton Constitution of 1954 each moved Nigeria closer to self-rule. By 1957, the Western and Eastern regions had achieved self-governance, with the North following in 1959.</p><p>On October 1, 1960, the green-white-green flag was raised for the first time in Lagos, and Tafawa Balewa became the first Prime Minister. The celebrations were enormous — but the challenges of uniting such a diverse nation were only beginning.</p><p>Within six years, the country would face a military coup, a counter-coup, and the devastating Biafran Civil War (1967-1970). Yet the spirit of October 1 endures as a testament to what Nigerians achieved together.</p>',
  'Independence',
  false, true, 'The Professor',
  '1960-10-01', 'Nigeria', 'West Africa', 7,
  ARRAY['Nigeria', 'Independence', 'West Africa', 'Decolonization']
),
(
  'The Nigerian Civil War: Biafra''s Fight for Survival',
  'nigerian-civil-war-biafra',
  'The Biafran War (1967-1970) remains one of Africa''s deadliest conflicts, claiming over two million lives and reshaping Nigeria forever.',
  '<p>On May 30, 1967, Colonel Odumegwu Ojukwu declared the secession of the Eastern Region as the Republic of Biafra, triggering a civil war that would last nearly three years and kill an estimated 2 million people, most from starvation.</p><p>The roots of the conflict lay in the ethnic tensions that had simmered since independence. The Igbo people of the East felt marginalized and targeted, especially after the anti-Igbo pogroms of 1966 in northern Nigeria that killed tens of thousands.</p><p>The war drew international attention, with France, Israel, and several African nations supporting Biafra, while Britain, the Soviet Union, and most of the international community backed the Nigerian federal government. The images of starving Biafran children became some of the first humanitarian crisis photographs to shock the global conscience.</p><p>The war ended on January 15, 1970, with Biafra''s surrender. General Yakubu Gowon declared "No victor, no vanquished," but the scars of the conflict remain deeply felt in Nigeria today.</p>',
  'Independence',
  false, true, 'The Professor',
  '1967-05-30', 'Nigeria', 'West Africa', 8,
  ARRAY['Nigeria', 'Civil War', 'Biafra', 'West Africa']
),

-- GRAMMY HISTORY
(
  'Africa''s Grammy Revolution: From Miriam Makeba to Burna Boy',
  'africas-grammy-revolution',
  'How African artists went from being overlooked by the Recording Academy to dominating the global stage and winning Grammy Awards.',
  '<p>When Miriam Makeba captivated American audiences in the 1960s with "Pata Pata," few could have predicted that African music would one day dominate global charts. Yet the journey from Makeba''s pioneering presence to Burna Boy''s 2021 Grammy win tells a powerful story of perseverance and cultural revolution.</p><p>The Grammy Awards, established in 1959, had long been a Western-centric institution. African musicians were rarely nominated, and when they were, it was often in niche categories. Ladysmith Black Mambazo''s collaboration with Paul Simon on "Graceland" (1986) brought African music to mainstream attention, but true recognition was slow.</p><p>Angelique Kidjo of Benin became a Grammy mainstay, winning Best World Music Album multiple times. But it was Burna Boy''s Best Global Music Album win for "Twice as Tall" in 2021, followed by Wizkid''s collaborations reaching billions of streams, that marked a seismic shift.</p><p>Tems, Rema, Davido, and Asake have continued this wave, proving that Afrobeats isn''t a trend — it''s a permanent force in global music. The 2024 Grammys featured more African nominees than ever before, with artists from Nigeria, Ghana, South Africa, and beyond.</p><p>This musical revolution mirrors a broader cultural awakening: Africa is no longer at the margins of global culture — it''s at the center.</p>',
  'Independence',
  false, true, 'The Professor',
  '2021-03-14', 'Nigeria', 'Global', 6,
  ARRAY['Grammy', 'Music', 'Nigeria', 'Afrobeats', 'Culture']
),

-- GUINNESS RECORDS
(
  'Africa''s Guinness World Records: Breaking Barriers, Making History',
  'africas-guinness-world-records',
  'From Nigeria''s Hilda Baci cooking for 93 hours to Kenya''s Eliud Kipchoge breaking the 2-hour marathon barrier, Africans are rewriting the record books.',
  '<p>In May 2023, Nigerian chef Hilda Baci cooked for 93 hours and 11 minutes straight, shattering the Guinness World Record for the longest cooking marathon. The event, held in Lagos, became a national celebration and a symbol of Nigerian determination and excellence.</p><p>But Baci''s achievement is just one chapter in Africa''s growing book of Guinness World Records. Kenya''s Eliud Kipchoge made history in 2019 when he became the first human to run a marathon in under two hours (1:59:40.2) at the INEOS 1:59 Challenge in Vienna.</p><p>South Africa''s DJ Obi set the record for the longest DJ set at 240 hours in 2016. Ethiopia''s Haile Gebrselassie held multiple world records in long-distance running. Nigerian drummer Harrison Ikechukwu set the record for the longest drumming marathon at 150 hours.</p><p>These records represent more than personal achievements — they symbolize a continent that refuses to be defined by others'' limitations. Each record broken is a statement: Africa produces excellence in every field.</p><p>In 2024, more African record-breakers emerged, from marathon dance-a-thons in Uganda to singing marathons in Ghana, each one capturing global attention and inspiring the next generation.</p>',
  'Independence',
  false, true, 'The Professor',
  '2023-05-15', 'Nigeria', 'Global', 6,
  ARRAY['Guinness', 'Records', 'Nigeria', 'Kenya', 'Achievement']
),

-- EUROPEAN HISTORY
(
  'The Treaty of Versailles: Sowing Seeds of the Next War',
  'treaty-of-versailles',
  'How the punitive peace treaty of 1919 humiliated Germany, destabilized Europe, and set the stage for World War II.',
  '<p>When the delegates gathered at the Palace of Versailles on June 28, 1919, they believed they were creating a lasting peace. Instead, they were sowing the seeds of an even more devastating conflict just twenty years later.</p><p>The Treaty of Versailles imposed harsh terms on Germany: acceptance of sole war guilt, massive reparations of 132 billion gold marks, loss of 13% of its territory and 10% of its population, and severe military restrictions. The German delegation signed under protest, calling it a "Diktat."</p><p>Economist John Maynard Keynes prophetically warned in "The Economic Consequences of the Peace" that the treaty would lead to economic disaster and political extremism. He was right on both counts.</p><p>The crushing reparations contributed to hyperinflation in the Weimar Republic, the Great Depression hit Germany particularly hard, and Adolf Hitler rose to power partly by promising to overturn the "shame of Versailles."</p><p>For Africa, the treaty meant the redistribution of German colonies as League of Nations mandates — trading one colonial master for another.</p>',
  'WWI',
  false, true, 'The Professor',
  '1919-06-28', 'France', 'Europe', 7,
  ARRAY['Versailles', 'WWI', 'Treaty', 'Europe', 'Germany']
),
(
  'The Scramble for Africa: How Europe Carved Up a Continent',
  'the-scramble-for-africa',
  'Between 1881 and 1914, European powers raced to colonize Africa, transforming the continent''s political map and the lives of millions forever.',
  '<p>The Scramble for Africa — also called the Partition of Africa — was the invasion, annexation, division, and colonization of most of Africa by seven European powers during the period between 1881 and 1914.</p><p>Before the scramble, only 10% of Africa was under European control. By 1914, it was 90%. Only Ethiopia and Liberia remained independent. The speed and scale of this colonization was unprecedented in human history.</p><p>The motivations were economic (raw materials, new markets), political (national prestige, strategic advantage), and ideological (the "civilizing mission" that Europeans used to justify their imperialism).</p><p>The human cost was staggering. In the Congo Free State alone, King Leopold II''s brutal rubber regime killed an estimated 10 million Congolese — half the population. In German South-West Africa (now Namibia), the Herero and Nama peoples suffered what many historians consider the first genocide of the 20th century.</p><p>The borders drawn during this period, often straight lines on maps that ignored ethnic, linguistic, and cultural realities, continue to cause conflict in Africa today.</p>',
  'Independence',
  false, true, 'The Professor',
  '1881-01-01', 'Multiple', 'Africa', 8,
  ARRAY['Colonialism', 'Europe', 'Africa', 'Scramble']
),

-- WORLD WAR I EXPANDED
(
  'The Gallipoli Campaign: A Disaster That Shaped Nations',
  'gallipoli-campaign',
  'The catastrophic Allied assault on the Ottoman Empire in 1915 killed over 300,000 and forged the national identities of Australia, New Zealand, and Turkey.',
  '<p>The Gallipoli Campaign of 1915-1916 stands as one of the greatest military disasters of World War I. Conceived by Winston Churchill as a way to knock the Ottoman Empire out of the war and open a supply route to Russia, the campaign instead became a bloody stalemate.</p><p>Allied forces — including troops from Britain, France, Australia, New Zealand, India, and Newfoundland — landed on the Gallipoli peninsula on April 25, 1915. They were met by fierce Ottoman resistance led by Mustafa Kemal (later Ataturk), who would go on to found modern Turkey.</p><p>For eight months, soldiers fought and died in terrible conditions. When the Allies finally evacuated in January 1916, they had suffered over 180,000 casualties. The Ottomans lost a similar number.</p><p>April 25 is commemorated as ANZAC Day in Australia and New Zealand, marking the birth of their national consciousness. For Turkey, Gallipoli was the crucible that forged a new national identity from the ashes of the Ottoman Empire.</p>',
  'WWI',
  false, true, 'The Professor',
  '1915-04-25', 'Turkey', 'Europe/Middle East', 6,
  ARRAY['Gallipoli', 'WWI', 'Ottoman Empire', 'ANZAC']
),
(
  'The Harlem Hellfighters: African Americans Who Fought for a Country That Didn''t Fight for Them',
  'harlem-hellfighters',
  'The 369th Infantry Regiment spent more days in combat than any other American unit in WWI, yet returned home to face racism and segregation.',
  '<p>They were called the "Harlem Hellfighters" — the 369th Infantry Regiment, an all-Black unit from New York that became one of the most decorated American units of World War I.</p><p>Because the U.S. Army refused to deploy them alongside white troops, the 369th was assigned to the French Army, which welcomed them. They spent 191 days in combat — more than any other American unit — never losing a foot of ground, never having a man captured.</p><p>Private Henry Johnson fought off a German raiding party single-handedly, earning France''s highest military honor, the Croix de Guerre. Yet when the Hellfighters returned home to New York in February 1919, marching up Fifth Avenue to thunderous applause, they returned to a country where they couldn''t eat in the same restaurants or drink from the same fountains as white Americans.</p><p>The summer of 1919 became known as "Red Summer" as race riots erupted across America. The contradiction of fighting for freedom abroad while being denied it at home radicalized a generation and planted seeds of the Civil Rights Movement.</p>',
  'WWI',
  false, true, 'The Professor',
  '1917-05-15', 'United States', 'Global', 7,
  ARRAY['WWI', 'African Americans', 'Harlem', 'Civil Rights']
),

-- WORLD WAR II EXPANDED
(
  'The North Africa Campaign: Desert Warfare That Changed WWII',
  'north-africa-campaign',
  'From 1940 to 1943, the deserts of North Africa became one of WWII''s most critical battlegrounds, with Africa''s own soil shaping global destiny.',
  '<p>The North Africa Campaign (June 1940 - May 1943) was a crucial theater of World War II that saw some of the war''s most iconic battles fought across the deserts of Libya, Egypt, Tunisia, Algeria, and Morocco.</p><p>It began with Italy''s declaration of war and its invasion of British-held Egypt from Libya. The initial Italian advances were repelled by smaller British and Commonwealth forces in Operation Compass, one of the war''s most lopsided victories.</p><p>Hitler sent Erwin Rommel — the "Desert Fox" — to rescue the Italians. Rommel''s Afrika Korps became legendary for their rapid maneuvers across the desert. The battles seesawed back and forth across thousands of miles.</p><p>The turning point came at El Alamein in October-November 1942, where British Field Marshal Montgomery decisively defeated Rommel. Combined with the Allied landings in Morocco and Algeria (Operation Torch), this trapped Axis forces in Tunisia.</p><p>African soldiers fought throughout this campaign, yet their contributions are often overshadowed by the narratives of European and American generals.</p>',
  'WWII',
  false, true, 'The Professor',
  '1940-06-10', 'Egypt', 'North Africa', 8,
  ARRAY['WWII', 'North Africa', 'Rommel', 'El Alamein']
),
(
  'D-Day: The African Soldiers You Never Heard About',
  'dday-african-soldiers',
  'On June 6, 1944, as Allied forces stormed Normandy, thousands of African soldiers served in supporting roles that made the invasion possible.',
  '<p>June 6, 1944 — D-Day — is remembered as the greatest amphibious invasion in history. But the story usually told focuses on American, British, and Canadian troops. The African contribution is almost never mentioned.</p><p>Thousands of African soldiers and laborers served in the logistics, supply, and support operations that made D-Day possible. West African troops had been fighting in Burma, freeing up British divisions for the Normandy invasion. North African ports served as staging areas for the Allied advance into Southern France.</p><p>Free French forces that landed in Provence in August 1944 (Operation Dragoon) included significant numbers of soldiers from French West Africa, French Equatorial Africa, and North Africa. These men — Tirailleurs Senegalais, Moroccan Goumiers, and Algerian Spahis — fought their way up through France.</p><p>After the liberation of Paris, a deliberate decision was made to "whiten" the French forces for the victory parade, replacing African soldiers with white French troops. This erasure was both literal and historical.</p>',
  'WWII',
  false, true, 'The Professor',
  '1944-06-06', 'France', 'Europe', 7,
  ARRAY['WWII', 'D-Day', 'France', 'Africa', 'Normandy']
),

-- SOUTH AFRICA
(
  'Apartheid and Liberation: South Africa''s Long Walk to Freedom',
  'apartheid-south-africa',
  'From the implementation of apartheid in 1948 to Nelson Mandela''s release in 1990, South Africa''s struggle against racial segregation inspired the world.',
  '<p>When the National Party came to power in South Africa in 1948, it formalized the system of racial segregation known as apartheid — Afrikaans for "apartness." For the next 46 years, the white minority government would systematically oppress the Black majority through a web of discriminatory laws.</p><p>The Population Registration Act classified every South African by race. The Group Areas Act forced different races into separate residential areas. The Bantu Education Act ensured Black South Africans received inferior education. Pass laws controlled where Black people could live and work.</p><p>Resistance took many forms: the Defiance Campaign of 1952, the Freedom Charter of 1955, the women''s march on Pretoria in 1956. But the Sharpeville massacre of March 21, 1960, when police killed 69 peaceful protesters, marked a turning point. The ANC and PAC were banned, and leaders like Nelson Mandela went underground.</p><p>Mandela was arrested in 1962 and sentenced to life imprisonment at the Rivonia Trial. He would spend 27 years in prison, mostly on Robben Island, becoming the world''s most famous political prisoner.</p><p>International sanctions, internal resistance, and diplomatic pressure finally brought the apartheid government to the negotiating table. On February 11, 1990, Mandela walked free. On April 27, 1994, South Africa held its first democratic elections, and Mandela became president.</p>',
  'Independence',
  false, true, 'The Professor',
  '1948-05-26', 'South Africa', 'Southern Africa', 10,
  ARRAY['Apartheid', 'South Africa', 'Mandela', 'Liberation']
),

-- GHANA
(
  'Kwame Nkrumah and the Birth of Ghana: First in Freedom',
  'kwame-nkrumah-ghana',
  'On March 6, 1957, the Gold Coast became Ghana — the first sub-Saharan African nation to achieve independence, igniting a continental revolution.',
  '<p>"We prefer self-government with danger to servitude in tranquility." These words by Kwame Nkrumah encapsulated the spirit that drove the Gold Coast to become Ghana on March 6, 1957 — the first sub-Saharan African country to gain independence from colonial rule.</p><p>Nkrumah, educated in the United States and Britain, returned to the Gold Coast in 1947 fired with Pan-African ideals. He organized strikes, boycotts, and mass demonstrations through his Convention People''s Party (CPP), using the slogan "Self-Government Now!"</p><p>His imprisonment by the British in 1950 only increased his popularity. When the CPP won the 1951 elections by a landslide, the British had no choice but to release him and begin the transition to independence.</p><p>At the independence ceremony, Nkrumah declared: "We are going to see that we create our own African personality and identity." The name Ghana was chosen deliberately — a reference to the medieval Ghana Empire — signaling a connection to Africa''s pre-colonial greatness.</p><p>Ghana''s independence electrified the continent and the African diaspora. Martin Luther King Jr. attended the ceremonies and later said it was one of the most significant moments of his life.</p>',
  'Independence',
  false, true, 'The Professor',
  '1957-03-06', 'Ghana', 'West Africa', 8,
  ARRAY['Ghana', 'Nkrumah', 'Independence', 'Pan-Africanism']
),

-- ETHIOPIA
(
  'The Battle of Adwa: Africa''s Greatest Military Victory',
  'battle-of-adwa',
  'On March 1, 1896, Ethiopia defeated Italy at the Battle of Adwa, becoming the only African nation to successfully repel European colonization.',
  '<p>The Battle of Adwa on March 1, 1896, stands as one of the most significant events in African history — and one of the most underreported in Western education. On that day, Ethiopian forces under Emperor Menelik II decisively defeated an invading Italian army, preserving Ethiopia''s independence during the height of the Scramble for Africa.</p><p>Italy had been encroaching on Ethiopian territory from its colony in Eritrea. The Treaty of Wuchale (1889) was interpreted differently by each side — Italy claimed it made Ethiopia a protectorate, while Menelik insisted it was a treaty of friendship. When diplomacy failed, war became inevitable.</p><p>Menelik mobilized an army of over 100,000 warriors, including soldiers armed with modern rifles purchased from France and Russia. The Italian force of 17,700 (including Eritrean askari) advanced into the mountains near Adwa.</p><p>The battle was a catastrophic defeat for Italy: nearly 7,000 Italian soldiers were killed, 1,500 wounded, and 3,000 captured. It was the worst defeat of a European army by an African force in the colonial era.</p><p>Adwa''s significance extends far beyond Ethiopia. It became a symbol of African resistance worldwide, inspiring Pan-African movements and anti-colonial struggles across the continent and the diaspora.</p>',
  'Independence',
  false, true, 'The Professor',
  '1896-03-01', 'Ethiopia', 'East Africa', 9,
  ARRAY['Ethiopia', 'Adwa', 'Military', 'Resistance']
),

-- CONGO
(
  'King Leopold''s Ghost: The Horror of the Congo Free State',
  'king-leopolds-ghost-congo',
  'Between 1885 and 1908, King Leopold II of Belgium''s personal colony in the Congo killed an estimated 10 million Congolese in one of history''s worst atrocities.',
  '<p>The Congo Free State (1885-1908) was not a colony of Belgium — it was the personal property of King Leopold II, who exploited it with a brutality that shocked even the imperial age. An estimated 10 million Congolese — roughly half the population — died under his regime.</p><p>Leopold acquired the territory through clever diplomacy at the Berlin Conference, presenting himself as a humanitarian philanthropist bringing "civilization" to Central Africa. The reality was a system of forced labor, mutilation, and terror designed to extract maximum profit from ivory and rubber.</p><p>When rubber demand boomed in the 1890s with the invention of inflatable bicycle tires and automobile tires, Leopold''s agents imposed impossible quotas on Congolese villagers. Those who failed to meet quotas had their hands cut off. Soldiers were required to present severed hands as proof they hadn''t "wasted" bullets.</p><p>The first major international human rights campaign of the 20th century was launched against Leopold''s regime, led by journalists like E.D. Morel and missionaries who documented the atrocities. In 1908, international pressure forced Leopold to hand the colony to the Belgian state.</p>',
  'Independence',
  false, true, 'The Professor',
  '1885-02-05', 'DR Congo', 'Central Africa', 9,
  ARRAY['Congo', 'Leopold', 'Colonialism', 'Atrocities']
),

-- MODERN GLOBAL
(
  'The Rise of Afrobeats: Nigeria''s Gift to Global Music',
  'rise-of-afrobeats-global',
  'From Fela Kuti''s revolutionary sounds to Wizkid and Burna Boy dominating Billboard, Afrobeats has become the world''s most exciting musical movement.',
  '<p>Afrobeats — the contemporary West African pop sound — has become one of the most dominant forces in global music. But its roots go back decades, to the revolutionary music of Fela Anikulapo Kuti.</p><p>Fela created Afrobeat (singular) in the late 1960s and 70s, fusing jazz, funk, and traditional Yoruba music with politically charged lyrics that challenged Nigeria''s military dictatorships. His marathon songs, sometimes lasting 30 minutes, and his fearless confrontation with authority made him a legend.</p><p>The modern Afrobeats (plural) movement began in the 2010s. Artists like Wizkid, Davido, and Burna Boy blended West African rhythms with contemporary pop, R&B, and dancehall. Wizkid''s feature on Drake''s "One Dance" (2016) topped the Billboard Hot 100, signaling Afrobeats'' arrival on the world stage.</p><p>Burna Boy''s "Last Last" (2022) sampled Toni Braxton and became a global anthem. Rema''s "Calm Down" with Selena Gomez spent over a year on the Billboard Hot 100. Tems co-wrote Rihanna''s "Lift Me Up" for Black Panther: Wakanda Forever.</p><p>By 2024, Afrobeats was no longer a niche genre — it was mainstream global pop, with Nigerian artists headlining major festivals from Coachella to Glastonbury.</p>',
  'Independence',
  false, true, 'The Professor',
  '2024-01-15', 'Nigeria', 'Global', 7,
  ARRAY['Afrobeats', 'Music', 'Nigeria', 'Global Culture', 'Fela']
),

-- KENYA
(
  'The Mau Mau Uprising: Kenya''s Bloody Road to Freedom',
  'mau-mau-uprising-kenya',
  'The Mau Mau rebellion (1952-1960) against British colonial rule in Kenya was met with brutal repression, but ultimately accelerated independence.',
  '<p>The Mau Mau Uprising was a militant African nationalist movement that emerged in Kenya in the early 1950s. Primarily drawn from the Kikuyu people, the movement fought against British colonial rule and, most importantly, against the theft of African land by white settlers.</p><p>The British declared a State of Emergency in October 1952. What followed was one of the most brutal counterinsurgency campaigns in colonial history. Over 1.5 million Kikuyu were forced into concentration camps. Detainees were subjected to torture, forced labor, starvation, and sexual violence.</p><p>The official British death count for Mau Mau fighters was around 11,000, but historians estimate the true death toll among Kenyans was much higher — potentially over 100,000 when including those who died in detention camps from disease and malnutrition.</p><p>Although the military uprising was suppressed by 1956, the political impact was irreversible. The British government realized that maintaining colonial rule in Kenya was unsustainable. In 1963, Kenya gained independence with Jomo Kenyatta — who had been imprisoned during the Emergency — as its first Prime Minister.</p>',
  'Independence',
  false, true, 'The Professor',
  '1952-10-20', 'Kenya', 'East Africa', 8,
  ARRAY['Kenya', 'Mau Mau', 'Liberation', 'British Empire']
),

-- RWANDA
(
  'Rwanda''s Transformation: From Genocide to Africa''s Singapore',
  'rwandas-transformation',
  'How Rwanda rebuilt itself from the ashes of the 1994 genocide to become one of Africa''s fastest-growing and most technologically advanced nations.',
  '<p>In just 100 days between April and July 1994, approximately 800,000 to 1 million Rwandans — primarily ethnic Tutsis and moderate Hutus — were massacred in one of the worst genocides in human history. The international community stood by and watched.</p><p>The genocide ended when the Rwandan Patriotic Front (RPF), led by Paul Kagame, took control of the country. What they inherited was a shattered nation: infrastructure destroyed, institutions collapsed, and a population traumatized beyond measure.</p><p>What happened next is one of the most remarkable stories of national transformation in modern history. Rwanda implemented the Gacaca community justice system to process over a million genocide cases. It abolished ethnic ID cards. It invested massively in education, healthcare, and technology.</p><p>By 2024, Rwanda had one of the lowest corruption rates in Africa, universal healthcare coverage, and was hosting major international events. Kigali became one of Africa''s cleanest and safest cities. The country''s tech hub, kLab, spawned hundreds of startups.</p><p>Rwanda''s transformation raises complex questions about the relationship between development and democracy, but its achievement in rising from the ashes of genocide is undeniable.</p>',
  'Independence',
  false, true, 'The Professor',
  '2024-04-07', 'Rwanda', 'East Africa', 8,
  ARRAY['Rwanda', 'Genocide', 'Transformation', 'Technology']
),

-- WORLD WARS EXPANDED
(
  'The Siege of Tobruk: Australian and African Soldiers Hold the Line',
  'siege-of-tobruk',
  'For 241 days in 1941, a garrison of Australian, British, Indian, and African troops held the Libyan port of Tobruk against Rommel''s Afrika Korps.',
  '<p>The Siege of Tobruk (April-November 1941) was one of the most remarkable defensive actions of World War II. For 241 days, a multinational garrison held the strategic Libyan port against repeated assaults by Rommel''s Afrika Korps.</p><p>The "Rats of Tobruk" — as the defenders proudly called themselves after German propaganda dubbed them "rats caught in a trap" — included Australians, British, Indian, Polish, and Czechoslovak troops, along with soldiers from across the African continent.</p><p>The defense of Tobruk was strategically vital: it denied Rommel a deepwater port and forced him to maintain long supply lines, ultimately contributing to his defeat at El Alamein. The siege showed that determined defenders could hold against superior forces when properly motivated.</p><p>South African forces would later be involved in the fall of Tobruk in June 1942, when over 33,000 Allied soldiers were captured — one of the largest surrenders in British military history and a devastating blow to South African morale.</p>',
  'WWII',
  false, true, 'The Professor',
  '1941-04-10', 'Libya', 'North Africa', 7,
  ARRAY['WWII', 'Tobruk', 'North Africa', 'Siege']
),

-- THE COMMONWEALTH EXPANDED
(
  'Queen Elizabeth II and Africa: A Complex Legacy',
  'queen-elizabeth-africa-legacy',
  'Elizabeth II became Queen while in Kenya and oversaw the transformation of the British Empire into the Commonwealth. Her relationship with Africa was deeply complicated.',
  '<p>Princess Elizabeth was in Kenya, at the Treetops Hotel in Aberdare National Park, when her father King George VI died on February 6, 1952. She ascended to the throne while on African soil — a symbolism that would resonate throughout her 70-year reign.</p><p>Elizabeth II presided over the largest peaceful decolonization in history. During her reign, dozens of African nations gained independence and many chose to join the Commonwealth. She made numerous visits to Africa and was reportedly genuinely fond of Kenya in particular.</p><p>But the relationship was complex. The independence movements happened despite, not because of, British goodwill. The Mau Mau emergency in Kenya, which involved torture and concentration camps, occurred under her watch. Britain''s support for apartheid South Africa (which left the Commonwealth in 1961) was a source of tension.</p><p>After her death in September 2022, reactions across Africa were mixed. Some mourned a respected figure; others questioned why Africa should mourn the symbol of an empire that had caused immense suffering.</p>',
  'The Commonwealth',
  false, true, 'The Professor',
  '1952-02-06', 'Kenya', 'Global', 7,
  ARRAY['Commonwealth', 'Queen Elizabeth', 'Kenya', 'British Empire']
),

-- MODERN AFRICA
(
  'Africa''s Tech Revolution: Silicon Savannah and Beyond',
  'africas-tech-revolution',
  'From Kenya''s M-Pesa mobile money revolution to Lagos''s booming startup scene, Africa is becoming a global technology powerhouse.',
  '<p>When Safaricom launched M-Pesa in Kenya in 2007, it was a simple mobile money transfer service. Within a decade, it had transformed financial inclusion across Africa, allowing millions of unbanked people to send money, pay bills, and access financial services through their phones.</p><p>M-Pesa was just the beginning. Africa''s tech revolution — often called the rise of "Silicon Savannah" (Nairobi), "Yabacon Valley" (Lagos), and "Silicon Cape" (Cape Town) — has produced unicorn startups, revolutionary products, and a new generation of African entrepreneurs.</p><p>Flutterwave and Paystack (both Nigerian) revolutionized payments. Andela trained world-class developers. Jumia became Africa''s first tech unicorn listed on the NYSE. Chipper Cash enabled free cross-border payments.</p><p>By 2024, Africa had produced over a dozen tech unicorns, attracted billions in venture capital, and was home to some of the world''s fastest-growing startup ecosystems. The narrative had shifted from "Africa needs aid" to "Africa builds solutions."</p>',
  'Independence',
  false, true, 'The Professor',
  '2024-06-15', 'Kenya', 'Global', 6,
  ARRAY['Technology', 'Startups', 'Kenya', 'Nigeria', 'Innovation']
),

-- MORE HISTORICAL
(
  'The Suez Crisis of 1956: When Africa Changed Cold War Politics',
  'suez-crisis-1956',
  'Egypt''s nationalization of the Suez Canal triggered an international crisis that ended British and French imperial dominance and reshaped global power.',
  '<p>On July 26, 1956, Egyptian President Gamal Abdel Nasser nationalized the Suez Canal Company, which had been controlled by British and French shareholders. His announcement, made during a speech in Alexandria, sent shockwaves through the world''s capitals.</p><p>The Suez Canal was the most important waterway in the world — a shortcut between Europe and Asia that carried a vast proportion of global trade. Britain, which had occupied Egypt since 1882 partly to protect the canal, viewed nationalization as an existential threat.</p><p>Britain, France, and Israel hatched a secret plan: Israel would invade Egypt, and Britain and France would intervene as "peacekeepers" to retake the canal. The invasion began on October 29, 1956.</p><p>But the United States and Soviet Union — for once united — demanded the invaders withdraw. Faced with superpower opposition and economic pressure, Britain and France were humiliated into retreat. It was the moment the curtain fell on European imperial power.</p><p>For Africa and the developing world, Suez was electrifying. It proved that a Third World leader could stand up to European powers and win.</p>',
  'Independence',
  false, true, 'The Professor',
  '1956-07-26', 'Egypt', 'North Africa', 7,
  ARRAY['Suez', 'Egypt', 'Cold War', 'Nasser', 'Decolonization']
),

(
  'The Nuremberg Trials: Justice After the Holocaust',
  'nuremberg-trials',
  'The 1945-1946 Nuremberg Trials established the principle that individuals — including heads of state — could be held accountable for crimes against humanity.',
  '<p>Between November 1945 and October 1946, the International Military Tribunal at Nuremberg tried 22 major Nazi war criminals. It was the first time in history that individuals were held personally accountable for crimes against peace, war crimes, and crimes against humanity.</p><p>The trials revealed the full horror of the Holocaust and Nazi atrocities to the world. Prosecutors presented evidence of the systematic murder of 6 million Jews, along with millions of Roma, disabled people, political prisoners, and others.</p><p>Of the 22 defendants, 12 were sentenced to death, 7 received prison terms, and 3 were acquitted. Hermann Goring, the highest-ranking Nazi survivor, cheated the hangman by taking a cyanide capsule the night before his execution.</p><p>Nuremberg''s legacy for Africa was profound. The legal principles established — that "following orders" was not a defense, that leaders could be held accountable for mass atrocities — would later be invoked in trials related to the Rwandan genocide and other African conflicts. The International Criminal Court, established in 2002, is a direct descendant of Nuremberg.</p>',
  'WWII',
  false, true, 'The Professor',
  '1945-11-20', 'Germany', 'Europe', 8,
  ARRAY['Nuremberg', 'WWII', 'Holocaust', 'Justice', 'International Law']
),

-- LEAGUE OF NATIONS EXPANDED
(
  'Haile Selassie''s Appeal: The Speech That Warned the World',
  'haile-selassie-league-of-nations',
  'In 1936, Ethiopian Emperor Haile Selassie stood before the League of Nations to plead for help against Italian invasion. His prophetic words went unheeded.',
  '<p>On June 30, 1936, Ethiopian Emperor Haile Selassie walked into the League of Nations Assembly in Geneva to deliver one of the most powerful speeches in diplomatic history. Italian journalists in the gallery heckled and jeered, but the diminutive emperor stood firm.</p><p>"I, Haile Selassie I, Emperor of Ethiopia, am here today to claim that justice which is due to my people, and the assistance promised to it eight months ago, when fifty nations asserted that aggression had been committed," he began.</p><p>Italy had invaded Ethiopia on October 3, 1935, using poison gas, bombing Red Cross hospitals, and committing atrocities against civilians. Despite Ethiopia being a member of the League, the organization''s response was feeble — limited economic sanctions that excluded oil, the one commodity that could have stopped Italy''s war machine.</p><p>Selassie''s most famous warning proved prophetic: "It is us today. It will be you tomorrow." Within three years, Hitler had invaded Poland, and the world was at war again.</p><p>The League''s failure to protect Ethiopia is widely considered the death blow to the organization''s credibility. It demonstrated that the League was unwilling to challenge powerful nations, making it irrelevant as a peacekeeping body.</p>',
  'League of Nations',
  false, true, 'The Professor',
  '1936-06-30', 'Ethiopia', 'Global', 8,
  ARRAY['Haile Selassie', 'League of Nations', 'Ethiopia', 'Italy']
),

-- EGYPT
(
  'The Building of the Aswan High Dam: Cold War in the Nile Valley',
  'aswan-high-dam',
  'Egypt''s monumental dam project became a Cold War battleground and a symbol of Third World development and sovereignty.',
  '<p>The Aswan High Dam, completed in 1970, was one of the largest engineering projects of the 20th century — and one of the most politically charged. Its construction reshaped Egypt''s economy, geopolitics, and the Nile itself.</p><p>President Nasser envisioned the dam as the cornerstone of Egypt''s modernization, providing hydroelectric power and controlling the Nile''s annual floods. When the United States and Britain withdrew funding in 1956, Nasser nationalized the Suez Canal to finance it, triggering an international crisis.</p><p>The Soviet Union stepped in, providing funding and technical expertise. The dam became a symbol of Cold War competition in Africa and the developing world. Over 30,000 workers spent 11 years building it.</p><p>The dam created Lake Nasser, one of the world''s largest artificial lakes, and required the relocation of over 100,000 Nubian people and the extraordinary international effort to save the Abu Simbel temples from flooding.</p>',
  'Independence',
  false, true, 'The Professor',
  '1970-07-21', 'Egypt', 'North Africa', 7,
  ARRAY['Egypt', 'Aswan', 'Cold War', 'Development']
),

-- AFRICAN WOMEN IN HISTORY
(
  'Queens and Warriors: Africa''s Powerful Women Leaders',
  'african-women-leaders',
  'From Queen Nzinga of Angola to Ellen Johnson Sirleaf of Liberia, African women have shaped history as rulers, warriors, and revolutionaries.',
  '<p>The Western narrative often portrays Africa as a patriarchal monolith, but the continent''s history is rich with powerful women who ruled kingdoms, led armies, and shaped nations.</p><p>Queen Nzinga of Ndongo and Matamba (modern-day Angola) fought a 30-year guerrilla war against Portuguese colonizers in the 17th century. She was a brilliant military strategist and diplomat who refused to submit to European domination.</p><p>Yaa Asantewaa, the Queen Mother of Ejisu in the Ashanti Empire (modern-day Ghana), led the last major war against British colonialism in 1900, personally commanding troops in battle.</p><p>In the 20th century, women were at the forefront of independence movements. Funmilayo Ransome-Kuti of Nigeria organized mass women''s protests. Wangari Maathai of Kenya founded the Green Belt Movement and became the first African woman to win the Nobel Peace Prize.</p><p>Ellen Johnson Sirleaf of Liberia became Africa''s first elected female head of state in 2006. Ngozi Okonjo-Iweala of Nigeria became the first woman and first African to lead the World Trade Organization in 2021.</p>',
  'Independence',
  false, true, 'The Professor',
  '2024-03-08', 'Multiple', 'Africa', 8,
  ARRAY['Women', 'Leadership', 'Africa', 'History', 'Queens']
),

-- MODERN SPORTS
(
  'Africa at the Olympics: Gold Medals and Broken Records',
  'africa-at-the-olympics',
  'From Abebe Bikila running barefoot in Rome to Eliud Kipchoge''s marathon dominance, African athletes have made Olympic history.',
  '<p>When Ethiopian Abebe Bikila ran barefoot through the streets of Rome to win the 1960 Olympic marathon, he became the first Black African to win an Olympic gold medal. Running past the Obelisk of Axum — which Italy had looted from Ethiopia — he delivered one of sport''s most symbolic victories.</p><p>Bikila defended his title in Tokyo in 1964, this time wearing shoes, setting a world record. His victories opened the floodgates for African athletic excellence at the Olympics.</p><p>Kenya and Ethiopia would go on to dominate distance running. Kipchoge Keino''s 1968 gold medal in Mexico City established Kenya as a running powerhouse. By 2024, Kenya had won over 100 Olympic medals, the vast majority in running events.</p><p>Nigeria has produced Olympic champions in football, athletics, and wrestling. South Africa''s Caster Semenya became a controversial figure whose case raised fundamental questions about gender and sport. Morocco''s Hicham El Guerrouj held the 1500m world record for 26 years.</p><p>The 2024 Paris Olympics saw the largest-ever African delegation, with athletes from 54 nations competing across dozens of sports, demonstrating the continent''s growing presence beyond its traditional running stronghold.</p>',
  'Independence',
  false, true, 'The Professor',
  '2024-07-26', 'Multiple', 'Global', 7,
  ARRAY['Olympics', 'Sports', 'Athletics', 'Africa', 'Records']
),

-- COLD WAR IN AFRICA
(
  'The Cold War in Africa: Proxy Wars That Devastated a Continent',
  'cold-war-in-africa',
  'From Angola to Somalia, the United States and Soviet Union turned Africa into a Cold War battleground, funding dictators and fueling civil wars.',
  '<p>The Cold War was not "cold" for Africa. From the 1960s to the 1990s, the United States and Soviet Union waged proxy wars across the continent, supporting dictators, funding rebel groups, and destabilizing newly independent nations.</p><p>The pattern was established early. In 1960, the CIA was involved in the assassination of Patrice Lumumba, the Congo''s first democratically elected prime minister, replacing him with the pro-Western dictator Mobutu Sese Seko, who would loot the country for 32 years.</p><p>Angola''s civil war (1975-2002) became a full-scale proxy conflict. The Soviet Union and Cuba backed the MPLA government, while the United States and apartheid South Africa supported UNITA rebels. The war killed over 500,000 people.</p><p>In the Horn of Africa, Ethiopia and Somalia switched Cold War patrons in the late 1970s, leading to devastating regional wars. In Mozambique, the CIA and apartheid South Africa backed RENAMO rebels against the socialist FRELIMO government.</p><p>When the Cold War ended, the superpowers withdrew their support, and several of these conflicts collapsed into chaos — most dramatically in Somalia, which descended into a civil war that continues to this day.</p>',
  'WWII',
  false, true, 'The Professor',
  '1960-06-30', 'Multiple', 'Global', 9,
  ARRAY['Cold War', 'Proxy Wars', 'Angola', 'Congo', 'Somalia']
),

-- RECENT HISTORY
(
  'The African Union at 20: Pan-African Dream or Talking Shop?',
  'african-union-at-20',
  'Two decades after replacing the OAU, the African Union faces questions about its effectiveness in addressing the continent''s challenges.',
  '<p>When the African Union (AU) was formally launched in Durban, South Africa, on July 9, 2002, it was meant to be a new beginning. Replacing the Organisation of African Unity (OAU), which had been criticized as a "dictators'' club" for its non-interference policy, the AU promised a more proactive approach to peace, democracy, and development.</p><p>The AU introduced the African Peer Review Mechanism, the African Court on Human and Peoples'' Rights, and the principle of the "right to intervene" in member states facing war crimes, genocide, or crimes against humanity.</p><p>Notable successes include peacekeeping missions in Somalia and the Central African Republic, mediation in numerous conflicts, and the African Continental Free Trade Area (AfCFTA), launched in 2021, which aims to create the world''s largest free trade zone.</p><p>But challenges remain enormous. Coups have resurged across West Africa and the Sahel since 2020. The AU''s dependence on external funding undermines its independence. And the gap between ambitious declarations and actual implementation remains wide.</p>',
  'Independence',
  false, true, 'The Professor',
  '2022-07-09', 'Multiple', 'Africa', 7,
  ARRAY['African Union', 'Pan-Africanism', 'Governance', 'Modern Africa']
)

ON CONFLICT (slug) DO NOTHING;

-- Add more timeline events
INSERT INTO timeline_events (year, title, description, category, sort_order) VALUES
  (1884, 'Berlin Conference', 'European powers meet to divide Africa among themselves. No African leaders are invited to the table.', 'Independence', 0),
  (1896, 'Battle of Adwa', 'Ethiopia defeats Italy, becoming the only African nation to successfully repel European colonization.', 'Independence', 0),
  (1936, 'Selassie''s Appeal', 'Emperor Haile Selassie makes his famous speech to the League of Nations after Italy invades Ethiopia.', 'League of Nations', 4),
  (1948, 'Apartheid Begins', 'South Africa''s National Party implements the apartheid system of racial segregation.', 'Independence', 6),
  (1952, 'Mau Mau Uprising', 'Kenya''s Mau Mau rebellion against British colonial rule begins, accelerating the path to independence.', 'Independence', 6),
  (1956, 'Suez Crisis', 'Egypt nationalizes the Suez Canal, ending British and French imperial dominance in the Middle East and Africa.', 'Independence', 6),
  (1967, 'Biafran War Begins', 'Nigeria''s civil war starts as the Eastern Region declares independence as the Republic of Biafra.', 'Independence', 10),
  (1990, 'Mandela Released', 'Nelson Mandela walks free after 27 years in prison, marking the beginning of the end of apartheid.', 'Independence', 11),
  (1994, 'Rwanda Genocide', 'Approximately 800,000 Rwandans are massacred in 100 days, shocking the world''s conscience.', 'Independence', 12),
  (1994, 'South Africa Free', 'South Africa holds its first democratic elections. Nelson Mandela becomes president.', 'Independence', 13),
  (2002, 'African Union Founded', 'The AU replaces the OAU, promising a more proactive approach to African peace and development.', 'Independence', 14),
  (2021, 'Burna Boy Wins Grammy', 'Nigerian artist Burna Boy wins Best Global Music Album, marking Afrobeats'' Grammy breakthrough.', 'Independence', 15),
  (2023, 'Hilda Baci Record', 'Nigerian chef Hilda Baci breaks the Guinness World Record for the longest cooking marathon at 93 hours.', 'Independence', 16)
ON CONFLICT DO NOTHING;
