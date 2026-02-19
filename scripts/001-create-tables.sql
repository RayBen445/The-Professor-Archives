-- Create articles table for The Professor's Archives
CREATE TABLE IF NOT EXISTS articles (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('WWI', 'WWII', 'League of Nations', 'Independence', 'The Commonwealth')),
  image_url TEXT,
  is_featured BOOLEAN DEFAULT false,
  published BOOLEAN DEFAULT false,
  author TEXT DEFAULT 'The Professor',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create timeline_events table
CREATE TABLE IF NOT EXISTS timeline_events (
  id SERIAL PRIMARY KEY,
  year INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Seed timeline events
INSERT INTO timeline_events (year, title, description, category, sort_order) VALUES
  (1914, 'World War I Begins', 'The Great War erupts across Europe, drawing in African colonial territories as battlegrounds and supply lines.', 'WWI', 1),
  (1918, 'Armistice Day', 'WWI ends. Over 2 million Africans served in the war effort, yet their contributions remain largely unrecognized.', 'WWI', 2),
  (1920, 'League of Nations Founded', 'The League is established to maintain peace, but African nations have no seat at the table.', 'League of Nations', 3),
  (1935, 'Italy Invades Ethiopia', 'Mussolini''s forces invade the last independent African state, exposing the League''s failures.', 'League of Nations', 4),
  (1939, 'World War II Begins', 'Another global conflict. African soldiers fight on multiple fronts from North Africa to Burma.', 'WWII', 5),
  (1945, 'WWII Ends & UN Founded', 'The war ends. The United Nations replaces the League, and winds of change begin to blow across Africa.', 'WWII', 6),
  (1957, 'Ghana''s Independence', 'Ghana becomes the first sub-Saharan African nation to gain independence, sparking a continental movement.', 'Independence', 7),
  (1960, 'Year of Africa', '17 African nations gain independence in a single year, reshaping the global political landscape forever.', 'Independence', 8),
  (1963, 'OAU Founded', 'The Organisation of African Unity is established in Addis Ababa, uniting 32 independent African states.', 'Independence', 9)
ON CONFLICT DO NOTHING;

-- Seed sample articles
INSERT INTO articles (title, slug, excerpt, content, category, is_featured, published, author) VALUES
  (
    'The Forgotten Front of East Africa',
    'the-forgotten-front-of-east-africa',
    'While the Western Front dominates the narrative of WWI, a brutal and cunning campaign was fought across East Africa that changed the continent forever.',
    '<p>When we think of World War I, images of trenches in France and Belgium dominate our imagination. But thousands of miles away, a different kind of war was being fought across the vast landscapes of East Africa.</p><p>The East African Campaign (1914-1918) was one of the longest and most grueling campaigns of the Great War. Led by German commander Paul von Lettow-Vorbeck, a small force of German and African soldiers — known as Askari — managed to evade and resist a combined Allied force that outnumbered them by more than eight to one.</p><p>What makes this campaign remarkable is not just the military strategy, but its human cost. Over 100,000 African carriers and soldiers died during this campaign, many from disease and starvation. Their stories have been largely erased from the mainstream narrative of the war.</p><p>The campaign fundamentally altered the political landscape of East Africa, redrawing colonial boundaries and setting the stage for future independence movements. The veterans who returned home brought with them new ideas about freedom, self-governance, and the inherent contradictions of fighting for colonial powers that denied them basic rights.</p>',
    'WWI',
    true,
    true,
    'The Professor'
  ),
  (
    'How the League of Nations Failed Africa',
    'how-the-league-of-nations-failed-africa',
    'Established to prevent another world war, the League of Nations systematically ignored the sovereignty and rights of African nations.',
    '<p>The League of Nations, established in 1920, promised a new era of international cooperation and peace. But for Africa, it represented something entirely different: a system designed to legitimize colonial control under the guise of ''mandates'' and ''civilization.''</p><p>Under the League''s mandate system, former German and Ottoman colonies were not freed but redistributed among the victorious Allied powers. African territories were classified as ''Class B'' and ''Class C'' mandates — categories that explicitly stated these peoples were not ready for self-governance.</p><p>When Ethiopia — one of only two independent African states at the time — was invaded by Fascist Italy in 1935, Emperor Haile Selassie made his famous appeal to the League. His words, warning that ''it is us today, it will be you tomorrow,'' fell on deaf ears. The League''s failure to protect Ethiopia exposed the institution as a tool of European power politics.</p>',
    'League of Nations',
    false,
    true,
    'The Professor'
  ),
  (
    'African Soldiers in World War II',
    'african-soldiers-in-world-war-ii',
    'Over one million African soldiers fought in WWII. Their bravery helped shape the outcome of the war, yet history rarely tells their story.',
    '<p>World War II was a truly global conflict, and Africa played a far more significant role than most history books acknowledge. Over one million African soldiers were mobilized to fight across multiple theaters of war.</p><p>From the deserts of North Africa to the jungles of Burma, African troops demonstrated extraordinary courage and resilience. The King''s African Rifles, the Royal West African Frontier Force, and the South African forces all made critical contributions to Allied victories.</p><p>The North African Campaign (1940-1943) saw fierce fighting across Libya, Egypt, Tunisia, and Algeria. The East African Campaign drove Italian forces from Ethiopia, Somalia, and Eritrea. And in the Burma Campaign, West African troops fought in some of the most difficult jungle conditions imaginable.</p>',
    'WWII',
    false,
    true,
    'The Professor'
  ),
  (
    'The Year Africa Changed Forever: 1960',
    'the-year-africa-changed-forever-1960',
    'In a single transformative year, seventeen African nations declared independence, forever altering the balance of global power.',
    '<p>1960 stands as perhaps the most transformative year in African history. Known as the ''Year of Africa,'' it saw seventeen nations throw off the chains of colonial rule and declare their sovereignty.</p><p>The wave of independence did not happen overnight. It was the culmination of decades of resistance, intellectual movements, and political organizing. Pan-African thinkers like Kwame Nkrumah, Leopold Senghor, and Patrice Lumumba had been building the ideological foundations for years.</p><p>When Ghana achieved independence in 1957 under Nkrumah, it sent shockwaves across the continent. The message was clear: African self-governance was not just possible, it was inevitable.</p>',
    'Independence',
    false,
    true,
    'The Professor'
  ),
  (
    'The Commonwealth: Partnership or Neo-Colonialism?',
    'the-commonwealth-partnership-or-neo-colonialism',
    'As former colonies joined the Commonwealth of Nations, questions arose about whether this was true partnership or a continuation of imperial influence.',
    '<p>The Commonwealth of Nations evolved from the British Empire into what it describes as a ''voluntary association of independent and equal sovereign states.'' But is it truly equal? This question has been debated since the organization''s modern inception.</p><p>For many African nations, joining the Commonwealth after independence was a pragmatic decision. It offered access to diplomatic networks, educational exchanges, and economic partnerships. But critics argue it perpetuated British cultural and economic influence under a new name.</p><p>The relationship between Commonwealth membership and genuine sovereignty remains one of the most nuanced debates in post-colonial African politics.</p>',
    'The Commonwealth',
    false,
    true,
    'The Professor'
  ),
  (
    'The Berlin Conference: Dividing a Continent',
    'the-berlin-conference-dividing-a-continent',
    'In 1884, European powers gathered in Berlin to carve up Africa among themselves. No African leader was invited.',
    '<p>Between November 1884 and February 1885, representatives of fourteen European nations gathered in Berlin at the invitation of German Chancellor Otto von Bismarck. Their purpose: to establish the rules for the colonization and trade in Africa.</p><p>Not a single African leader was invited or consulted. The conference drew arbitrary borders across the continent, dividing ethnic groups, splitting kingdoms, and creating artificial states that continue to cause conflict today.</p><p>The Berlin Conference formalized the ''Scramble for Africa'' and set the stage for decades of colonial exploitation that would only end with the independence movements of the mid-20th century.</p>',
    'Independence',
    false,
    true,
    'The Professor'
  )
ON CONFLICT (slug) DO NOTHING;
