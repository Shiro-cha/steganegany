

# Steganegany

**Steganegany** est un outil en ligne de commande permettant de cacher un message dans une image PNG à l'aide de la méthode de stéganographie **LSN** (Least Significant Bit) avec des emplacements et une construction aléatoires pour garantir la sécurité des données cachées.

## Installation

### Prérequis

Assurez-vous d'avoir **Bun** ou **npm** installé sur votre machine.

### Installation des dépendances

Avant d'utiliser **steganegany**, installez les dépendances nécessaires avec **Bun** :

```bash
bun install
```

### Construction du projet

Construisez le projet pour générer le fichier JavaScript :

```bash
bun build steganegany.ts dist --target node
```

### Installation globale

Pour installer **steganegany** globalement et l'utiliser comme une commande CLI dans n'importe quel répertoire, exécutez :

#### Avec Bun :

```bash
bun install --global
```

#### Avec npm :

```bash
npm install -g .
```

---

## Utilisation

Une fois installé globalement, vous pouvez exécuter **steganegany** directement depuis votre terminal :

```bash
steganegany
```

### Commandes disponibles

```bash
steganegany [options] [command]
```

Affiche l'aide générale.

### Options :

* `-h, --help` : Affiche l'aide générale.

### Commandes :

* `hide <input-file> [message] [output-file]` : Cache un message dans une image PNG.
* `reveal <input-file>` : Révèle le message caché dans une image PNG.
* `reset` : Réinitialise les mots de passe reconnus dans le système.
* `help [command]` : Affiche l'aide spécifique pour une commande.

---

## Commandes détaillées

### `hide`

Cache un message dans une image PNG.

```bash
Usage: steganegany hide [options] <input-file> [message] [output-file]

Arguments:
  input-file    L'image PNG dans laquelle le message sera caché.
  message       Le message à cacher. Si aucun message n'est fourni, il sera demandé dans l'entrée standard.
  output-file   L'image résultante contenant le message caché. Si aucun fichier n'est spécifié, l'image d'entrée sera écrasée.

Options:
  -h, --help     Affiche l'aide pour cette commande.
```

**Exemple :**

```bash
steganegany hide input.png "Message secret" output.png
```

### `reveal`

Révèle le message caché dans une image PNG.

```bash
Usage: steganegany reveal [options] <input-file>

Arguments:
  input-file    L'image PNG contenant le message caché.

Options:
  -h, --help     Affiche l'aide pour cette commande.
```

**Exemple :**

```bash
steganegany reveal input.png
```

### `reset`

Réinitialise les mots de passe enregistrés dans le système.

```bash
Usage: steganegany reset [options]

Options:
  -h, --help     Affiche l'aide pour cette commande.
```

**Exemple :**

```bash
steganegany reset
```

---

## Algorithme de Stéganographie : LSN avec position aléatoire

### LSN (Least Significant Bit)

Le projet utilise l'algorithme **LSN (Least Significant Bit)** pour cacher des informations dans les pixels d'une image PNG. Les bits les moins significatifs des pixels sont modifiés pour cacher le message de manière invisible à l'œil nu.

### Processus de Stéganographie

1. **Encodage** : Le message est converti en une série de bits.
2. **Insertion** : Les bits du message sont insérés dans les pixels de l'image, en modifiant uniquement les bits les moins significatifs.
3. **Sécurité renforcée** : Les positions des pixels modifiés sont choisies de manière aléatoire pour rendre l'extraction du message plus difficile sans connaître l'algorithme utilisé.

---

