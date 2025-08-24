# 🔍 Pokédex Web App

A personal pokedex webapp that displays it in a Bulbapedia-style interface.
Used for data fetch practice and purposes.
Will add a Teambuilder page for VGC

## ✨ Features

- **🔍 Search Functionality**: Enter any Pokémon name to get detailed information
- **📊 Detailed Stats Display**: View base stats with color-coded progress bars
- **🎨 Type & Ability Information**: Beautiful badges showing Pokémon types and abilities
- **⚔️ Comprehensive Moveset**: Expandable move list categorized by learning method
  - Level-up moves
  - TM/TR moves
  - Egg moves
  - Move tutor moves
- **📱 Responsive Design**: Works perfectly on desktop and mobile devices
- **🎯 Bulbapedia-style UI**: Clean, table-based layout matching the iconic Pokémon wiki

## 🚀 Demo

![Pokédex Demo](screenshot.png) *(Add a screenshot of your app here)*

## 🛠️ Technologies Used

- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with gradients, animations, and responsive design
- **Vanilla JavaScript**: ES6+ features, async/await, fetch API
- **PokéAPI**: RESTful API for Pokémon data

## 📋 Getting Started

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/pokedex-web-app.git
   cd pokedex-web-app
   ```

2. **Open the project**:
   - Simply open `index.html` in your web browser
   - Or use a local server (recommended):
     ```bash
     # Using Python 3
     python -m http.server 8000
     
     # Using Node.js (if you have http-server installed)
     npx http-server
     ```

3. **Start exploring**:
   - Enter a Pokémon name (e.g., "pikachu", "charizard", "mewtwo")
   - Press Enter or click the search button
   - Explore the stats, types, abilities, and moves!

## 📁 Project Structure

```
pokedex-web-app/
├── index.html              # Main HTML file
├── styles.css              # All CSS styling
├── DataFetchPractice/
│   └── index.js            # JavaScript logic
├── .gitignore              # Git ignore rules
└── README.md               # This file
```

## 🎯 Key Features Explained

### 📊 Stat Bars
- Color-coded based on stat values (red for low, green for high)
- Perfectly aligned progress bars using CSS gradients
- Scaled appropriately for Pokémon stat ranges

### 🎨 Type Badges
- Authentic Pokémon type colors
- Clean, rounded badge design
- Supports all 18 Pokémon types

### ⚔️ Move Categories
- **Level-up Moves**: Moves learned by leveling up
- **TM/TR Moves**: Technical Machine and Technical Record moves
- **Egg Moves**: Moves learned through breeding
- **Move Tutor**: Moves taught by NPCs
- **Other**: Special moves from various sources

### 📱 Responsive Design
- Mobile-friendly interface
- Adaptive layouts for different screen sizes
- Touch-friendly buttons and interactions

## 🔧 Customization

### Adding New Features
- **Pokémon Evolution Chain**: Extend the API calls to include evolution data
- **Move Descriptions**: Add move descriptions and effects
- **Pokémon Comparison**: Compare stats between multiple Pokémon
- **Favorites System**: Local storage for favorite Pokémon

### Styling Modifications
- All styles are in `styles.css`
- Easy to modify color schemes
- CSS custom properties for consistent theming

## 🌐 API Reference

This project uses the [PokéAPI](https://pokeapi.co/):
- **Pokémon Data**: `https://pokeapi.co/api/v2/pokemon/{name}`
- **Move Details**: `https://pokeapi.co/api/v2/move/{move-name}`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [PokéAPI](https://pokeapi.co/) for the comprehensive Pokémon data
- [Bulbapedia](https://bulbapedia.bulbagarden.net/) for design inspiration
- The Pokémon Company for creating this amazing universe

## 📞 Contact

- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

---

*Gotta catch 'em all!* 🎯✨
