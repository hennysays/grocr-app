var regexDairy = new RegExp(/Milk|Lait(?!ue)|Yogurt|Yogourt|Eggs|Oeufs|Cheese|Fromage|Bocconcini|Ricotta|Jarlsberg|Raclette|Camembert|Cream|Crème|Dubliner|Butter|Margarine|Soy|Tofu/i);
var regexFruitVeg = new RegExp(/apple|pomme|pear|poire|orange|banana|banane|pineapple|ananas|cerise|cherries|cherry|berry|berries|bleuet|fraise|laitue|lettuce|broccoli|brocoli|cauliflower|chou|fleur|garlic|onion|oignon|\bail\b|tomato|tomate|potato|celery|céleri|cucumber|concombre|carrot|avocado|avocat|grapefruit|pamplemousse|mûre|clementine|bean|mango|vegetable|salad|clémentine|mushroom|champignon|radish/i);
var regexMeat = new RegExp(/meat|viande|hot dog|chicken|poulet|poultry|beef|boeuf|veal|veau|pork|porc|steak|rosbif|roast|osso buco|sausage|saucisse|wiener|loin|filet|poitrine|breast|rôti|saucisson|bologne|bologna|pepperoni|dinde|turkey|\bham\b|jambon|lamb|agneau|capocollo/i);
var regexBakery = new RegExp(/bread|pain|croissant|bagel|muffin|cereal|céréale/i);
var regexSeafood = new RegExp(/fish|poisson|bass|basse|salmon|saumon|trout|tuna|truite|thon|shrimp|crevette|lobster|homard|crab|crabe|squid|calmar/i);
var regexDrinks = new RegExp(/coffee|café|\btea\b|\bthé\b|drink|boisson|juice|\bjus\b|pepsi|water|coca-cola|coke|smoothie|beer|bière/i);
var regexRicePasta = new RegExp(/rice|riz|pasta|macaroni|spaghetti|lasagna|lasagne/i);
var regexFrozen = new RegExp(/frozen|surgelé/i);
var regexMisc = new RegExp(/\bcat(?!.)\b|\bchat\b|dog food|chien/i);
exports.categorize = function(itemName, itemDescription) {

	itemNameDescription = itemName + " " + itemDescription;
	
	var matches = itemNameDescription.match(regexMisc);
	if(matches!=null) {
		return 9;
	}
	
	// Frozen foods
	var matches = itemNameDescription.match(regexFrozen);	
	if(matches!=null) {
		return 8;
	}

	// Bakery
	var matches = itemNameDescription.match(regexBakery);
	if(matches!=null) {
		return 4;
	}

	// Rice & Pasta
	var matches = itemNameDescription.match(regexRicePasta);
	if(matches!=null) {
		return 7;
	}

	// Dairy
	var matches = itemNameDescription.match(regexDairy);
	if(matches!=null) {
		return 1;
	}

	// Seafood
	var matches = itemNameDescription.match(regexSeafood);
	if(matches!=null) {
		return 5;
	}

	// Drinks
	var matches = itemNameDescription.match(regexDrinks);
	if(matches!=null) {
		return 6;
	}

	// Meat
	var matches = itemNameDescription.match(regexMeat);
	if(matches!=null) {
		return 3;
	}

	// Fruits and Veggies
	var matches = itemNameDescription.match(regexFruitVeg);
	if(matches!=null) {
		return 2;
	}

	// Misc.
	return 9;

}



