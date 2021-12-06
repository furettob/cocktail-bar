# Readme - CocktailBar App
Spunti per esericizi/esempi da svolgere sull'app. 

--------

_Per l'installazione in locale fare riferimento a questa [guida](./install.md)_

--------

### E1 - "Challenging" "Simple" a seconda del numero di ingredienti

Utilizza il **ternary operator** per aggiungere una dicitura nella cocktail card,
prima del numero di ingredienti.
Il testo deve dire:
- "challenging" se il cocktail ha più di 5 ingredienti
- "simple" altrimenti

Parti dal file "DrinkCard.jsx"


### E2 - aggiungi un testo che indica la proprietà/il copyright dell'immagine del cocktail

Utilizza lo **short circuit** per mostrare gli attributi strImageAttribution e strCreativeCommonsConfirmed
ove presenti.

Esempio di cocktail che ha questi dati: Long Island Tea

Parti dal file "DrinkCard.jsx"


### E3 - Rendi l'icona del testo "Show more" sensibile allo stato

Al momento l'icona mostra sempre la "i" di info.
Cambia il tag in modo che sia
- un "meno" quando il testo dice "Show Less"
- un "più" quando il testo dice "Show more"

Parti dal file "DrinkCard.jsx"



### E4 - gestione dello stato

Aggiungi uno stato "selected" nel file Tag.jsx. 
Il componente con classe "cb-tag" deve avere:
- una classe aggiuntiva "cb-tag--selected" se lo stato è selected
- solo le classi di base, se il tag non ha stato selected

Lo stato selected è un booleano, questo deve cambiare al click sul tag

Parti dal file "Tag.jsx"



### E5 - gestione dello stato

Aggiungi uno stato "queryString" che salvi la stringa cercata nel file
pages/AllCocktails.jsx

Cambia il testo "No cocktail found for your query." in modo che riporti quale query è stata cercata. 

Parti dal file "pages/AllCocktails.jsx"



### E6 - usa un componente dalla libreria react-router-dom

Prendendo spunto dal link "Details" crea un link "Back to all" che rimandi
dal dettaglio di un cocktail alla lista in "homepage"

Parti dal file "pages/DrinkDetail.jsx"
