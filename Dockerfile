# 1. Verwende das offizielle Node.js-Image als Basis
FROM node:18

# 2. Setze das Arbeitsverzeichnis im Container
WORKDIR /app

# 3. Kopiere die package.json und package-lock.json (falls vorhanden) aus dem Backend-Ordner
COPY Backend/package*.json ./

# 4. Installiere die Abhängigkeiten
RUN npm install

# 5. Kopiere den restlichen Anwendungs-Code aus dem Backend-Ordner
COPY Backend/ .

# 6. Exponiere den Port, auf dem der Server läuft (z.B. 6800)
EXPOSE 3000

# 7. Start-Befehl, um den Node.js-Server zu starten
CMD ["npm", "run devStart"]
