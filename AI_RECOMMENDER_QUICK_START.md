# 🚀 AI Recommender - Quick Start Guide

## 📦 What's Included

The AI-Assisted Scheme Recommender feature is now fully integrated into Rakshaniti!

### New Files Created

```
user/src/
├── components/pages/ai-recommender/
│   ├── AskRakshaniti.jsx          # Main chat interface
│   └── MessageBubble.jsx          # Message components
├── data/
│   └── schemesData.json           # 20 government schemes
└── utils/
    ├── nlpProcessor.js            # NLP entity extraction
    └── schemeRecommender.js       # Matching algorithm
```

### Modified Files

```
user/src/
├── App.jsx                        # Added route: /ask-Rakshaniti
└── components/
    └── Navbar.jsx                 # Added "Ask AI 🤖" navigation link
```

---

## 🎯 How to Use

### For End Users

1. **Navigate to the AI Chat**
   - Click "Ask AI 🤖" in the navigation bar
   - Or visit: `http://localhost:5173/ask-Rakshaniti`

2. **Ask a Question**
   - Type your query in natural language
   - Example: "I'm a 45-year-old farmer from Maharashtra"

3. **Get Recommendations**
   - AI analyzes your query
   - Shows top 5 matching schemes
   - Click "Apply Now" to visit scheme website

### Sample Queries to Try

```
✅ "I'm a 45-year-old farmer from Maharashtra looking for irrigation subsidy"
✅ "Need scholarship for my daughter who is in college"
✅ "I'm a woman entrepreneur wanting to start a small business"
✅ "Looking for pension schemes for senior citizens above 60"
✅ "I'm unemployed and want skill development training"
✅ "Need health insurance for my family with low income"
```

---

## 🛠️ For Developers

### Running the Application

```bash
# Navigate to user directory
cd user

# Install dependencies (if not already done)
npm install

# Start development server
npm run dev

# Open browser to http://localhost:5173
# Navigate to /ask-Rakshaniti
```

### Testing the Feature

1. **Test Entity Extraction**
```javascript
import { extractEntities } from './utils/nlpProcessor';

const query = "I'm a 45-year-old farmer from Maharashtra";
const entities = extractEntities(query);
console.log(entities);
// Output: { age: 45, occupation: ['farmer'], state: 'maharashtra', ... }
```

2. **Test Recommendations**
```javascript
import { recommendSchemes } from './utils/schemeRecommender';
import { extractEntities } from './utils/nlpProcessor';

const query = "I'm a 45-year-old farmer from Maharashtra";
const entities = extractEntities(query);
const schemes = recommendSchemes(entities, 5);
console.log(schemes);
// Output: Array of top 5 recommended schemes with scores
```

---

## 📝 Adding New Schemes

To add a new government scheme:

1. **Open** `user/src/data/schemesData.json`

2. **Add new scheme object**:
```json
{
  "id": "new-scheme-id",
  "scheme_name": "New Scheme Name",
  "category": "Category",
  "description": "Brief description",
  "eligibility": {
    "occupation": ["Farmer", "All"],
    "age_min": 18,
    "age_max": 60,
    "income_limit": 500000,
    "state_specific": ["All"],
    "gender": ["All"],
    "bpl": false
  },
  "benefits": "What beneficiaries receive",
  "application_link": "https://scheme-website.gov.in",
  "keywords": ["keyword1", "keyword2", "keyword3"]
}
```

3. **Save** and the AI will automatically include it in recommendations!

---

## 🎨 Customizing the UI

### Change Chat Colors

Edit `AskRakshaniti.jsx`:

```javascript
// User message bubble color
className="bg-blue-600"  // Change to your color

// Bot message bubble gradient
className="bg-gradient-to-br from-purple-600 to-blue-600"  // Customize gradient
```

### Modify Suggestion Buttons

Edit `AskRakshaniti.jsx` in the initial message:

```javascript
suggestions: [
  "Your custom suggestion 1",
  "Your custom suggestion 2",
  "Your custom suggestion 3"
]
```

### Adjust Number of Recommendations

Edit `AskRakshaniti.jsx`:

```javascript
const recommendations = recommendSchemes(entities, 5);  // Change 5 to desired number
```

---

## 🧠 Understanding the NLP

### Entities Extracted

| Entity | How It's Detected | Example |
|--------|-------------------|---------|
| **Age** | Regex patterns | "45 years old" → 45 |
| **Occupation** | Keyword matching | "farmer" → ['farmer'] |
| **State** | State name list | "Maharashtra" → 'maharashtra' |
| **Gender** | Gender keywords | "woman" → 'female' |
| **Income** | Amount + lakh/rupees | "5 lakh" → 500000 |
| **BPL** | BPL keywords | "below poverty line" → true |
| **Intent** | Category keywords | "irrigation" → ['agriculture'] |

### Improving Entity Extraction

To add new occupation keywords, edit `nlpProcessor.js`:

```javascript
const OCCUPATION_KEYWORDS = {
  'farmer': ['farmer', 'agriculture', 'farming', 'your-new-keyword'],
  'your-new-occupation': ['keyword1', 'keyword2'],
  // ... add more
};
```

---

## 🎯 Understanding the Scoring

### Hybrid Score Formula

```
Final Score = (Eligibility × 0.6) + (Similarity × 0.3) + (Popularity × 0.1)
```

### Adjusting Weights

Edit `schemeRecommender.js`:

```javascript
const hybridScore = (
  eligibilityScore * 0.6 +    // Change weight here
  similarityScore * 0.3 +      // Change weight here
  popularityScore * 0.1        // Change weight here
);
```

### Changing Minimum Threshold

```javascript
const filteredSchemes = scoredSchemes.filter(s => s.finalScore > 0.2);  // Adjust 0.2
```

---

## 🐛 Troubleshooting

### Issue: No recommendations shown

**Solution**: Check if query contains recognizable entities
```javascript
// Add console.log in AskRakshaniti.jsx
console.log('Extracted entities:', entities);
console.log('Recommendations:', recommendations);
```

### Issue: Wrong schemes recommended

**Solution**: Review eligibility criteria in `schemesData.json`
- Ensure age ranges are correct
- Check occupation matching
- Verify state-specific settings

### Issue: UI not responsive

**Solution**: Check Tailwind classes
- Ensure responsive classes (sm:, md:, lg:) are present
- Test on different screen sizes
- Check browser console for errors

---

## 📊 Performance Tips

### Optimize for Large Datasets

If adding 100+ schemes:

1. **Implement pagination** in results
2. **Add caching** for frequent queries
3. **Use Web Workers** for heavy processing
4. **Lazy load** scheme data

### Reduce Bundle Size

```javascript
// Use dynamic imports
const { recommendSchemes } = await import('./utils/schemeRecommender');
```

---

## 🔧 Advanced Customization

### Add Multi-language Support

1. Create translation files:
```javascript
// translations/hi.json
{
  "greeting": "नमस्ते! मैं सरलसेवा AI सहायक हूं।",
  "placeholder": "अपना प्रश्न यहाँ लिखें..."
}
```

2. Detect language and switch:
```javascript
const [language, setLanguage] = useState('en');
```

### Integrate with Backend

```javascript
// Instead of local JSON
const schemes = await fetch('/api/schemes').then(r => r.json());
```

### Add Analytics

```javascript
// Track queries
const trackQuery = (query, recommendations) => {
  // Send to analytics service
  analytics.track('ai_query', {
    query,
    recommendationCount: recommendations.length
  });
};
```

---

## 📚 API Reference

### `extractEntities(text)`

Extracts entities from user query.

**Parameters**:
- `text` (string): User query

**Returns**: Object with:
- `age` (number | null)
- `occupation` (string[] | null)
- `state` (string | null)
- `gender` (string | null)
- `income` (number | null)
- `bpl` (boolean | null)
- `intent` (string[])
- `originalText` (string)

### `recommendSchemes(entities, topN)`

Recommends schemes based on extracted entities.

**Parameters**:
- `entities` (object): From `extractEntities()`
- `topN` (number): Number of recommendations (default: 5)

**Returns**: Array of scheme objects with scores

### `generateRecommendationExplanation(scheme, entities)`

Generates explanation for why scheme was recommended.

**Parameters**:
- `scheme` (object): Scheme object
- `entities` (object): User entities

**Returns**: String with explanation

---

## 🎓 Learning Resources

### Understanding the Code

1. **Start with**: `AskRakshaniti.jsx` - Main component
2. **Then read**: `nlpProcessor.js` - Entity extraction
3. **Finally**: `schemeRecommender.js` - Matching logic

### Key Concepts

- **NLP**: Natural Language Processing basics
- **Jaccard Similarity**: Text similarity algorithm
- **Hybrid Scoring**: Combining multiple metrics
- **React Hooks**: useState, useEffect, useRef

---

## ✅ Checklist for Production

Before deploying:

- [ ] Test with 20+ different queries
- [ ] Verify all 20 schemes are working
- [ ] Check mobile responsiveness
- [ ] Test dark mode
- [ ] Validate accessibility (screen readers)
- [ ] Optimize performance (< 1s response)
- [ ] Add error handling
- [ ] Test browser compatibility
- [ ] Review privacy compliance
- [ ] Update documentation

---

## 🤝 Need Help?

- **Documentation**: See `AI_RECOMMENDER_FEATURE.md`
- **Code Comments**: All functions are documented
- **GitHub Issue**: Create issue with `ai-recommender` label
- **Community**: Ask in discussions

---

## 🎉 You're Ready!

The AI Recommender is fully functional and ready to use. Start by:

1. ✅ Running the dev server
2. ✅ Navigating to `/ask-Rakshaniti`
3. ✅ Trying the example queries
4. ✅ Customizing for your needs

**Happy Coding! 🚀**

---

*Last Updated: October 28, 2024*
*Version: 1.0.0*
*Status: Production Ready ✅*
