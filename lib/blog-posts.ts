export interface BlogPost {
  id: number
  slug: string
  category: string
  title: string
  excerpt: string
  date: string
  readTime: string
  scripture: string
  scriptureText: string
  image: string
  body: string[]
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    slug: 'that-which-is-perfect-is-come',
    category: 'Devotional',
    title: 'That Which Is Perfect Is Come',
    excerpt: 'The Call of God is for us to accept the fullness of Christ and the Perfection that He wrought for us. The work of Jesus in His death, burial and resurrection accomplished for us more than what we are experiencing now.',
    date: 'Apr 2, 2026',
    readTime: '4 min read',
    scripture: '1 Cor 13:10',
    scriptureText: '"But when that which is perfect is come, then that which is in part shall be done away." — 1 Corinthians 13:10',
    image: '/images/pexels-bible-1869164_1280.jpg',
    body: [
      'The Call of God is for us to accept the fullness of Christ and the Perfection that He wrought for us. The work of Jesus in His death, burial and resurrection accomplished for us more than what we are experiencing now.',
      'Most believers are living far beneath their inheritance. They have accepted a partial gospel — one that offers forgiveness but stops short of fullness. But God\'s intention was never partial. When He sent His Son, He sent everything. Every spiritual blessing. Every dimension of authority. Every measure of grace.',
      'The Greek word "teleios" — perfection — speaks not of outward moral performance, but of completeness. Of arriving at the full purpose for which something was designed. A man who is "teleios" in Christ is a man who has come into his full inheritance as a son of God.',
      '"That which is perfect is come" is not a future hope — it is a present reality. Christ is here. The fullness is available now. The question is not whether God has done enough. The question is whether we will receive it all.',
      'Begin to declare this truth over your life: "I am complete in Christ. I have received the fullness. I walk in the perfection that Jesus wrought for me." This is not arrogance — it is the language of sons. Let the Word of God be the loudest voice in your ears today.',
    ],
  },
  {
    id: 2,
    slug: 'the-lamb-of-god-understanding-gods-sacrifice',
    category: 'Teaching',
    title: "The Lamb of God: Understanding God's Sacrifice",
    excerpt: "A two-part teaching exploring the depth of what the sacrifice of the Lamb accomplishes for every believer — not just forgiveness, but the full restoration of our identity, authority, and standing before God.",
    date: 'Mar 28, 2026',
    readTime: '6 min read',
    scripture: 'John 1:29',
    scriptureText: '"Behold the Lamb of God, which taketh away the sin of the world." — John 1:29',
    image: '/images/yannick-pulver-FAU2NI1Uixg-unsplash.jpg',
    body: [
      '"Behold the Lamb of God, which taketh away the sin of the world." John 1:29 is one of the most familiar declarations in all of Scripture. But most believers have only grasped the surface of what those words contain.',
      'There is a tendency in the church to reduce the sacrifice of the Lamb to a single transaction — sin forgiven, eternity secured. And while this is gloriously true, it is not the fullness of what the Lamb accomplished. The Lamb did not come merely to cancel a debt. He came to restore a relationship, a position, and a dominion.',
      'When Adam fell, he did not merely become guilty — he lost his identity, his authority, and his fellowship with the Father. The sacrifice of the Lamb reversed every dimension of that loss. Not just the guilt, but the shame. Not just the punishment, but the estrangement. Not just the consequence, but the condition.',
      'The Apostle John saw this. "Behold the Lamb." This is not just a title — it is a revelation. To behold the Lamb is to see the full scope of what God was doing in Christ. He was not just paying a price. He was making sons.',
      'This is the teaching we must receive deeply: you are not merely pardoned. You are restored. You are not just forgiven — you are reinstated. The Lamb took away the sin of the world so that the sons of God could be fully manifested in the earth. Walk today in the light of everything He accomplished.',
    ],
  },
  {
    id: 3,
    slug: 'the-perfection-of-god-is-in-christ',
    category: 'Devotional',
    title: 'The Perfection of God Is in Christ',
    excerpt: "It is wrong for you to judge yourself as imperfect, because you are judging one that is a member of Christ. We have to discern the body of Christ. Declare the Glory of God that is in you. You are one with Him.",
    date: 'Mar 20, 2026',
    readTime: '3 min read',
    scripture: 'Eph 5:30',
    scriptureText: '"For we are members of his body, of his flesh, and of his bones." — Ephesians 5:30',
    image: '/images/pexels-bible-1868359_1280.jpg',
    body: [
      'Scripture declares that we are members of His body — of His flesh and of His bones. This is not poetic language. This is a statement of spiritual reality so profound that Paul says it is a "great mystery." You are one with Christ.',
      'This means that when you look at yourself, you are not looking at an isolated individual still struggling toward God\'s standard. You are looking at a member of Christ — someone who is spiritually joined to the One who is the perfection of God.',
      'It is wrong for you to judge yourself as imperfect, because you are judging one who is a member of Christ. When you call yourself weak, you are calling a member of Christ weak. When you call yourself a failure, you are calling a member of Christ a failure. This is a failure to discern the body.',
      'Paul wrote to the Corinthians that many were weak and sick among them — and the reason was that they did not discern the Lord\'s body (1 Cor 11:29-30). There is a direct connection between how you see your identity in Christ and the level of life you walk in.',
      'Begin today to declare the glory of God that is in you. Not because you have earned it, but because you are in Christ. You are not alone in your development. You are one with Him who is complete. Let that reality govern your words, your thinking, and your walk today.',
    ],
  },
  {
    id: 4,
    slug: 'new-series-ministry-of-the-spirit',
    category: 'News',
    title: 'New Series: The Ministry of the Spirit',
    excerpt: 'Three new Saturday class recordings are now available — exploring the active, transforming work of the Holy Spirit in the life of the believer. The Spirit is not passive. He is doing something right now on the inside of you.',
    date: 'Mar 12, 2026',
    readTime: '3 min read',
    scripture: 'Acts 1:8',
    scriptureText: '"But ye shall receive power, after that the Holy Ghost is come upon you." — Acts 1:8',
    image: '/images/sermon-3.jpg',
    body: [
      'We are excited to announce that three new recordings from the Saturday Manifested Sons of God Class are now available in the teaching library — covering the powerful and often-misunderstood Ministry of the Holy Spirit.',
      'This series tackles one of the most important and practical revelations for the believer today: the Holy Spirit is not passive. He is not sitting idle within you, waiting to be invited to move. He is actively at work — transforming, empowering, witnessing, interceding, and perfecting you from the inside out.',
      'Many believers have received the Spirit but are not walking in the daily reality of His ministry. The teaching series explores how to cooperate with the Spirit\'s work, how to be sensitive to His movements, and how to allow His ministry to manifest in practical areas of life — relationships, decisions, authority, and faith.',
      'The three sessions are titled: (1) Who Is the Holy Spirit?, (2) The Spirit\'s Role in Sonship, and (3) Walking After the Spirit. Each session builds on the last, providing both doctrinal foundation and practical application.',
      'These recordings are available now in the audio library. We encourage every believer to listen, take notes, and discuss with others in their spiritual community. The Spirit is doing something on the inside of you — let us learn to recognise it.',
    ],
  },
  {
    id: 5,
    slug: 'dont-advertise-god-small',
    category: 'Devotional',
    title: "Don't Advertise God Small",
    excerpt: "You are the head and not the tail. Jesus died to make us the First and the Best in all areas of our lives. Through you God is showing the world His Power. Show forth His excellence in all that concerns you.",
    date: 'Mar 5, 2026',
    readTime: '3 min read',
    scripture: 'Eph 2:10',
    scriptureText: '"For we are his workmanship, created in Christ Jesus unto good works." — Ephesians 2:10',
    image: '/images/sermon-4.jpg',
    body: [
      'You are the workmanship of God. The Greek word Paul uses — "poiema" — is the root from which we get the English word "poem." You are God\'s poem. His masterpiece. His finest creative expression in all of the earth.',
      'When you live beneath this reality — when you accept mediocrity, tolerate defeat, or present yourself in a way that undervalues what God has made you — you are advertising God small. You are telling the world, through your life, that God produces ordinary results.',
      'But you are not ordinary. Jesus died to make you the First and the Best in every area of your life. He did not suffer to produce a people who barely get by. He suffered to produce sons who manifest the fullness of God\'s excellence in every domain of life — work, family, community, creativity, character.',
      'You are the head and not the tail. This is not a motivational phrase — it is a covenantal declaration. Deuteronomy 28 describes the life of one who walks in the blessing of God. And the blessing is not reserved for a future age. It is your inheritance now, in Christ.',
      'Show forth His excellence in everything that concerns you. Let your work be excellent. Let your relationships reflect His love. Let your words carry His authority. Through you, God is showing the world what He can do with a surrendered person. Don\'t advertise Him small.',
    ],
  },
  {
    id: 6,
    slug: 'kingship-training-for-reigning',
    category: 'Teaching',
    title: 'Kingship: Training for Reigning',
    excerpt: "A four-part series from the Manifested Sons Class on what it means to walk as a king in the Kingdom of God — covering the doctrine of righteousness, the stance of a king, and a kingdom of words.",
    date: 'Feb 25, 2026',
    readTime: '5 min read',
    scripture: 'Rom 5:17',
    scriptureText: '"For if by one man\'s offence death reigned by one; much more they which receive abundance of grace and of the gift of righteousness shall reign in life by one, Jesus Christ." — Romans 5:17',
    image: '/images/rod-long-TzgZrZQFVPc-unsplash.jpg',
    body: [
      'Romans 5:17 contains one of the most remarkable declarations in the New Testament. Paul does not say that we shall reign in eternity — he says we shall reign "in life." In this life. Right now. Through one Man, Jesus Christ.',
      'Kingship is not a position earned through spiritual achievement. It is the natural identity of a son who has received the abundance of grace and the gift of righteousness. You do not work toward reigning — you receive it. And from that reception, you walk accordingly.',
      'The Kingship series from the Saturday class covers four dimensions of this reality: (1) The Doctrine of Righteousness — the foundation upon which a king stands, (2) The Stance of a King — how a king carries himself in every context, (3) A Kingdom of Words — the power of the king\'s declaration, and (4) The King\'s Domain — exercising authority in your particular sphere of influence.',
      'Too many believers are living in survival mode — reacting to circumstances rather than governing them. But a king does not merely react. A king establishes. A king declares. A king sets the tone for his domain. This is what Christ has called you to.',
      'These four sessions are available in the audio library. We encourage you to listen prayerfully, not just informationally. The revelation of kingship is not meant to remain in the intellect — it is meant to transform your posture, your speech, and your daily walk. Receive it and reign.',
    ],
  },
]

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug)
}
