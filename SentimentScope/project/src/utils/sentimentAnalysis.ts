// Enhanced sentiment analysis with better hashtag and username handling
// In production, this would be replaced with actual ML model API calls

interface SentimentAnalysis {
  sentiment: 'positive' | 'negative' | 'neutral';
  score: number;
  confidence: number;
}

const positiveWords = [
  'love', 'like', 'happy', 'great', 'awesome', 'amazing', 'excellent', 'fantastic', 
  'wonderful', 'good', 'best', 'perfect', 'brilliant', 'outstanding', 'superb',
  'delighted', 'thrilled', 'excited', 'pleased', 'satisfied', 'enjoy', 'beautiful',
  'incredible', 'magnificent', 'marvelous', 'spectacular', 'fabulous', 'terrific',
  'glad', 'cheerful', 'joyful', 'optimistic', 'positive', 'successful', 'win',
  'victory', 'triumph', 'celebrate', 'congratulations', 'thank', 'grateful',
  'appreciate', 'blessed', 'lucky', 'fortunate', 'smile', 'laugh', 'fun',
  'feeling', 'vibes', 'only', 'nice', 'cool', 'sweet', 'fresh'
];

const negativeWords = [
  'hate', 'dislike', 'sad', 'bad', 'terrible', 'awful', 'horrible', 'disgusting',
  'worst', 'pathetic', 'useless', 'stupid', 'annoying', 'frustrated', 'angry',
  'mad', 'furious', 'disappointed', 'upset', 'depressed', 'stressed', 'worried',
  'anxious', 'scared', 'afraid', 'hurt', 'pain', 'suffer', 'cry', 'tears',
  'broken', 'failed', 'failure', 'lose', 'loss', 'defeat', 'disaster', 'crisis',
  'problem', 'issue', 'trouble', 'difficult', 'hard', 'struggle', 'fight',
  'argue', 'conflict', 'war', 'violence', 'death', 'sick', 'ill', 'disease',
  'days', 'boy', 'girl', 'life', 'time', 'day', 'night', 'week', 'month', 'year'
];

const neutralWords = [
  'okay', 'fine', 'normal', 'average', 'standard', 'typical', 'usual', 'regular',
  'common', 'ordinary', 'moderate', 'medium', 'fair', 'decent', 'acceptable'
];

const intensifiers = [
  'very', 'extremely', 'really', 'super', 'incredibly', 'absolutely', 'totally',
  'completely', 'quite', 'rather', 'pretty', 'so', 'too', 'highly', 'deeply'
];

const negators = [
  'not', 'no', 'never', 'nothing', 'nobody', 'nowhere', 'neither', 'nor',
  'hardly', 'barely', 'scarcely', 'seldom', 'rarely', "don't", "doesn't",
  "didn't", "won't", "wouldn't", "can't", "couldn't", "shouldn't", "isn't", "aren't"
];

const uncertaintyWords = [
  'maybe', 'perhaps', 'might', 'could', 'possibly', 'probably', 'think', 'guess',
  'suppose', 'assume', 'believe', 'seem', 'appear', 'likely', 'unlikely', 'doubt',
  'wonder', 'question', 'unsure', 'confused', 'mixed', 'complicated'
];

// Special hashtag patterns - EXPANDED with #sadlife and more
const positiveHashtagPatterns = [
  'blessed', 'goodvibes', 'happy', 'love', 'amazing', 'awesome', 'great',
  'fantastic', 'wonderful', 'perfect', 'beautiful', 'success', 'winning',
  'grateful', 'thankful', 'excited', 'thrilled', 'joy', 'smile', 'fun',
  'positive', 'motivation', 'inspiration', 'dream', 'hope', 'peace',
  'feelingblessed', 'goodvibesonly', 'livingmybestlife', 'goodday', 'goodtime',
  'goodlife', 'goodboy', 'goodgirl', 'bestday', 'bestlife', 'happydays',
  'goodmorning', 'goodnight', 'goodweek', 'goodmonth', 'goodyear', 'blessed',
  'happylife', 'greatlife', 'amazinglife', 'perfectlife', 'wonderfullife'
];

const negativeHashtagPatterns = [
  'sad', 'angry', 'frustrated', 'disappointed', 'stressed', 'worried',
  'tired', 'exhausted', 'broken', 'hurt', 'pain', 'struggle', 'difficult',
  'problem', 'issue', 'crisis', 'disaster', 'failure', 'defeat', 'loss',
  // CORE BAD PATTERNS
  'baddays', 'badday', 'badtime', 'badlife', 'badboy', 'badgirl', 'badweek',
  'badmonth', 'badyear', 'worstday', 'worstlife', 'terribleday', 'awfulday',
  'horribleday', 
  // SAD PATTERNS - ADDED #sadlife and variants
  'saddays', 'sadday', 'sadlife', 'sadtime', 'sadweek', 'sadmonth', 'sadyear',
  'sadboy', 'sadgirl', 'sadness', 'saddest', 'sadder', 'sadmoment', 'sadstory',
  // HARD/TOUGH PATTERNS
  'harddays', 'hardlife', 'hardtime', 'toughdays', 'toughlife', 'toughtime',
  'darkdays', 'darklife', 'darktime', 'roughdays', 'roughlife', 'roughtime',
  // STRESS/BURNOUT PATTERNS
  'stressedout', 'stressedlife', 'burnedout', 'burnout', 'feddup', 'overit', 
  'donewith', 'canteven', 'exhaustedlife', 'tiredlife',
  // EMOTIONAL PATTERNS
  'struggling', 'sufferinglife', 'hurting', 'crying', 'depressed', 'depressedlife',
  'anxious', 'anxiouslife', 'worried', 'worriedlife', 'scared', 'scaredlife',
  'afraid', 'angry', 'angrylife', 'mad', 'madlife', 'furious', 'upset', 'upsetlife',
  // FAILURE PATTERNS
  'failedlife', 'brokenlife', 'lostlife', 'hopelesslife', 'miserablelife',
  'terriblelife', 'awfullife', 'horriblelife', 'painfulllife', 'difficultlife'
];

function splitCamelCase(text: string): string[] {
  // Split camelCase and PascalCase words
  return text.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase().split(/\s+/);
}

function processHashtags(text: string): { words: string[], isHashtagSentiment: boolean, hashtagSentiment: 'positive' | 'negative' | 'neutral' } {
  const hashtags = text.match(/#\w+/g) || [];
  const processedWords: string[] = [];
  let hashtagSentiment: 'positive' | 'negative' | 'neutral' = 'neutral';
  let isHashtagSentiment = false;
  
  hashtags.forEach(hashtag => {
    const cleanTag = hashtag.substring(1).toLowerCase(); // Remove #
    
    // Check direct matches first for NEGATIVE (prioritize negative detection)
    if (negativeHashtagPatterns.includes(cleanTag)) {
      processedWords.push('negative', 'bad', 'terrible', 'sad');
      hashtagSentiment = 'negative';
      isHashtagSentiment = true;
      return;
    }
    
    // Check direct matches for POSITIVE
    if (positiveHashtagPatterns.includes(cleanTag)) {
      processedWords.push('positive', 'good', 'amazing', 'happy');
      hashtagSentiment = 'positive';
      isHashtagSentiment = true;
      return;
    }
    
    // Split camelCase hashtags and check individual words
    const splitWords = splitCamelCase(cleanTag);
    
    // Check if any split word is clearly positive or negative
    let hasPositive = false;
    let hasNegative = false;
    
    splitWords.forEach(word => {
      if (positiveWords.includes(word)) {
        hasPositive = true;
        processedWords.push(word, 'positive', 'good');
      } else if (negativeWords.includes(word)) {
        hasNegative = true;
        processedWords.push(word, 'negative', 'bad');
      } else {
        processedWords.push(word);
      }
    });
    
    // Determine overall hashtag sentiment (prioritize negative)
    if (hasNegative) {
      hashtagSentiment = 'negative';
      isHashtagSentiment = true;
    } else if (hasPositive) {
      hashtagSentiment = 'positive';
      isHashtagSentiment = true;
    }
  });
  
  return { words: processedWords, isHashtagSentiment, hashtagSentiment };
}

function processUsernames(text: string): { isUsername: boolean; confidence: number } {
  const usernames = text.match(/@\w+/g) || [];
  
  if (usernames.length > 0 && text.trim().split(/\s+/).length <= 2) {
    // If the text is mostly just usernames, return neutral with low confidence
    return { isUsername: true, confidence: 0.3 };
  }
  
  return { isUsername: false, confidence: 1.0 };
}

export function analyzeSentiment(text: string): SentimentAnalysis {
  // Check if this is primarily a username mention
  const usernameInfo = processUsernames(text);
  if (usernameInfo.isUsername) {
    return {
      sentiment: 'neutral',
      score: 0,
      confidence: usernameInfo.confidence
    };
  }

  // Process hashtags first - ENHANCED
  const hashtagInfo = processHashtags(text);
  const hashtagWords = hashtagInfo.words;
  
  // Regular word processing
  const cleanText = text.replace(/#\w+/g, '').replace(/@\w+/g, ''); // Remove hashtags and usernames for regular processing
  const words = cleanText.toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 0);

  // Combine regular words with processed hashtag words
  const allWords = [...words, ...hashtagWords];

  let positiveScore = 0;
  let negativeScore = 0;
  let neutralScore = 0;
  let uncertaintyCount = 0;
  let sentimentWordCount = 0;
  
  for (let i = 0; i < allWords.length; i++) {
    const word = allWords[i];
    const prevWord = i > 0 ? allWords[i - 1] : '';
    const nextWord = i < allWords.length - 1 ? allWords[i + 1] : '';
    
    // Check for uncertainty words
    if (uncertaintyWords.includes(word)) {
      uncertaintyCount++;
    }
    
    // Check for negation
    const isNegated = negators.includes(prevWord) || negators.includes(nextWord);
    
    // Check for intensifiers
    const isIntensified = intensifiers.includes(prevWord) || intensifiers.includes(nextWord);
    const multiplier = isIntensified ? 1.5 : 1.0;
    
    if (positiveWords.includes(word)) {
      sentimentWordCount++;
      const score = 1 * multiplier;
      if (isNegated) {
        negativeScore += score;
      } else {
        positiveScore += score;
      }
    } else if (negativeWords.includes(word)) {
      sentimentWordCount++;
      const score = 1 * multiplier;
      if (isNegated) {
        positiveScore += score;
      } else {
        negativeScore += score;
      }
    } else if (neutralWords.includes(word)) {
      neutralScore += 0.5;
      sentimentWordCount++;
    }
  }

  // ENHANCED: Even stronger boost for hashtag sentiment
  if (hashtagInfo.isHashtagSentiment) {
    const hashtagBoost = hashtagWords.length * 2.0; // Increased from 1.5 to 2.0
    
    if (hashtagInfo.hashtagSentiment === 'positive') {
      positiveScore += hashtagBoost;
      sentimentWordCount += 3; // Count hashtags as multiple sentiment indicators
    } else if (hashtagInfo.hashtagSentiment === 'negative') {
      negativeScore += hashtagBoost;
      sentimentWordCount += 3; // Count hashtags as multiple sentiment indicators
    }
  }

  // Calculate final sentiment
  const totalScore = positiveScore + negativeScore + neutralScore;
  
  if (totalScore === 0) {
    return {
      sentiment: 'neutral',
      score: 0,
      confidence: 0.4 + Math.random() * 0.2 // 40-60% for no sentiment words
    };
  }

  const positiveRatio = positiveScore / totalScore;
  const negativeRatio = negativeScore / totalScore;
  
  let sentiment: 'positive' | 'negative' | 'neutral';
  let score: number;
  let baseConfidence: number;

  if (positiveRatio > negativeRatio && positiveRatio > 0.3) {
    sentiment = 'positive';
    score = Math.min(positiveRatio * 2 - 0.5, 1);
    baseConfidence = 0.6 + (positiveRatio * 0.3);
  } else if (negativeRatio > positiveRatio && negativeRatio > 0.3) {
    sentiment = 'negative';
    score = Math.max(-(negativeRatio * 2 - 0.5), -1);
    baseConfidence = 0.6 + (negativeRatio * 0.3);
  } else {
    sentiment = 'neutral';
    score = (positiveRatio - negativeRatio) * 0.5;
    baseConfidence = 0.5 + Math.random() * 0.2;
  }

  // Adjust confidence based on various factors
  let finalConfidence = baseConfidence;

  // ENHANCED: Even bigger boost for hashtag sentiment recognition
  if (hashtagInfo.isHashtagSentiment) {
    finalConfidence += 0.25; // Increased from 0.2 to 0.25
  }

  // Reduce confidence for uncertainty words
  if (uncertaintyCount > 0) {
    finalConfidence -= (uncertaintyCount * 0.15);
  }

  // Reduce confidence for mixed sentiments
  if (positiveScore > 0 && negativeScore > 0) {
    const mixedRatio = Math.min(positiveScore, negativeScore) / Math.max(positiveScore, negativeScore);
    finalConfidence -= (mixedRatio * 0.2);
  }

  // Reduce confidence for short texts with few sentiment words
  if (allWords.length < 3 || sentimentWordCount < 1) {
    finalConfidence -= 0.1;
  }

  // Reduce confidence for very long texts (harder to analyze)
  if (allWords.length > 50) {
    finalConfidence -= 0.05;
  }

  // Ensure confidence stays within reasonable bounds
  finalConfidence = Math.max(0.3, Math.min(0.95, finalConfidence));

  return {
    sentiment,
    score: Number(score.toFixed(3)),
    confidence: Number(finalConfidence.toFixed(3))
  };
}