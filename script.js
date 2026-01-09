        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let selectedType = null;
        let isLighter = false;
        let isFuseMode = false;
        let fuseType = null;
        let fuseStart = null;
        let placedFireworks = [];
        let particles = [];
        let draggedItem = null;
        let activeFuses = [];
        let connections = [];

        const fuseSpeed = {
            instant: 0,
            superfast: 100,
            fast: 400,
            medium: 800,
            slow: 1500
        };

        const fireworkData = {
            rocket: {
                icon: '🚀',
                name: 'Rakete',
                colors: ['#ff0000', '#ff6600', '#ffff00']
            },
            fountain: {
                icon: '⛲',
                name: 'Fontäne',
                colors: ['#00ff00', '#00ffaa', '#00ff88']
            },
            roman: {
                icon: '🎆',
                name: 'Römisches Licht',
                colors: ['#0000ff', '#ff00ff', '#00ffff']
            },
            sparkler: {
                icon: '✨',
                name: 'Wunderkerze',
                colors: ['#ffffff', '#ffffaa', '#ffddaa']
            },
            battery: {
                icon: '🔋',
                name: 'Batterie',
                colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00']
            },
            volcano: {
                icon: '🌋',
                name: 'Vulkan',
                colors: ['#ff4400', '#ff6600', '#ffaa00']
            },
            multishot: {
                icon: '💥',
                name: 'Multishot',
                colors: ['#ff0088', '#8800ff', '#00ff88']
            },
            spiral: {
                icon: '🌀',
                name: 'Spirale',
                colors: ['#00aaff', '#aa00ff', '#ffaa00']
            },
            giant: {
                icon: '🎇',
                name: 'Riesen-Rakete',
                colors: ['#ff0000', '#ff6600', '#ffff00', '#00ff00', '#0000ff', '#ff00ff']
            },
            nova: {
                icon: '⭐',
                name: 'Nova',
                colors: ['#ffffff', '#ffff00', '#ff00ff', '#00ffff']
            },
            finale: {
                icon: '🎊',
                name: 'Grand Finale',
                colors: ['#ff0000', '#ff8800', '#ffff00', '#00ff00', '#0088ff', '#8800ff']
            },
            waterfall: {
                icon: '💧',
                name: 'Wasserfall',
                colors: ['#0088ff', '#00aaff', '#00ccff', '#00ffff']
            },
            frog: {
                icon: '🐸',
                name: 'Knallfrosch',
                colors: ['#00ff00', '#00dd00', '#44ff44']
            },
            silvergold: {
                icon: '🌟',
                name: 'Silber-Gold Split',
                colors: ['#c0c0c0', '#ffd700']
            },
            peony: {
                icon: '🌸',
                name: 'Pfingstrose',
                colors: ['#ff69b4', '#ff1493', '#ff00ff']
            },
            chrysanthemum: {
                icon: '🏵️',
                name: 'Chrysantheme',
                colors: ['#ff4500', '#fba500', '#ff0000']
            },
            willow: {
                icon: '🌳',
                name: 'Trauerweide',
                colors: ['#ffd700', '#ffff00', '#0fff00']
            },
            palm: {
                icon: '🌴',
                name: 'Palme',
                colors: ['#00ff00', '#32cd32', '#7fff00']
            },
            crossette: {
                icon: '✖️',
                name: 'Crossette',
                colors: ['#ff0000', '#ff6600', '#ffff00']
            },
            strobes: {
                icon: '⚡',
                name: 'Stroboskop',
                colors: ['#ffffff', '#ffff00']
            },
            crackling: {
                icon: '🔥',
                name: 'Knisterregen',
                colors: ['#ff8c00', '#ffa500', '#ffd700']
            },
            ringshell: {
                icon: '⭕',
                name: 'Ring Shell',
                colors: ['#00ffff', '#00bfff', '#1e90ff']
            },
            heart: {
                icon: '❤️',
                name: 'Herz',
                colors: ['#ff0066', '#ff1493', '#ff69b4']
            },
            saturn: {
                icon: '🪐',
                name: 'Saturn',
                colors: ['#daa520', '#ffd700', '#ffff00']
            },
            kamuro: {
                icon: '👑',
                name: 'Kamuro',
                colors: ['#ffd700', '#ffff00', '#fff8dc']
            },
            rainbow: {
                icon: '🌈',
                name: 'Regenbogen',
                colors: ['#ff0000', '#ffa500', '#ffff00', '#008000', '#0000ff', '#4b0082', '#ee82ee']
            },
            brocade: {
                icon: '🎭',
                name: 'Brokade',
                colors: ['#daa520', '#ff8c00', '#ffd700']
            },
            glitter: {
                icon: '💎',
                name: 'Glitzer',
                colors: ['#e0e0e0', '#ffffff', '#f0f0f0']
            },
            comet: {
                icon: '☄️',
                name: 'Komet',
                colors: ['#00ffff', '#0088ff', '#ffffff']
            },
            mine: {
                icon: '⚫',
                name: 'Mine',
                colors: ['#ffffff', '#ffff00', '#ff6600']
            },
            zipper: {
                icon: '⚡',
                name: 'Reißverschluss',
                colors: ['#ff00ff', '#ff0088', '#8800ff']
            },
            ufo: {
                icon: '🛸',
                name: 'UFO-Invasion',
                colors: ['#00ff00', '#00ffff', '#ff00ff']
            },
            ghost: {
                icon: '👻',
                name: 'Geisterlicht',
                colors: ['#ffffff', '#aaffaa']
            },
            kraken: {
                icon: '🦑',
                name: 'The Kraken',
                colors: ['#00ffcc', '#0099ff', '#ff00ff']
            },
            supernova: {
                icon: '☄️',
                name: 'Supernova',
                colors: ['#ffffff', '#fff0f5', '#483d8b']
            },
            satellite: {
                icon: '🛰️',
                name: 'Satellit',
                colors: ['#00ff00', '#ffffff']
            },
            spinner: {
                icon: '🌀',
                name: 'Bodenwirbel',
                colors: ['#ff0000', '#ffff00', '#0000ff']
            },
            beehive: {
                icon: '🐝',
                name: 'Bienenstich',
                colors: ['#ffd700', '#000000']
            },
            komodo3000: {
                icon: '🦎',
                name: 'Komodo 3000',
                colors: ['#ffffff', '#fffaf0', '#ff4500', '#ffd700'],
                desc: 'VORSICHT: Erhellt die Nacht zum Tag!'
            },
            paint: {
                icon: '🎨',
                name: 'Paint Splash',
                colors: ['#FF1493', '#00BFFF', '#FFD700', '#ADFF2F']
            },
            medusa: {
                icon: '🪼',
                name: 'Mini-Medusa',
                colors: ['#E0B0FF', '#00FFFF']
            },
            fireflies: {
                icon: '✨',
                name: 'Glühwürmchen',
                colors: ['#CCFF00', '#FFFF99']
            },
            nebula: {
                icon: '🌌',
                name: 'Gasnebel',
                colors: ['#4B0082', '#9400D3', '#00008B']
            },
            gravity_well: {
                icon: '🕳️',
                name: 'Gravitation',
                colors: ['#ffffff', '#555555']
            },
            chriz_battery: {
                icon: '🔋',
                name: 'ChriZ\'s Batterie',
                colors: ['#ff0000', '#ff6600', '#ffff00', '#00ff00', '#0088ff', '#ff00ff', '#ffffff', '#ffd700']
            }
        };



        let unlockedAchievements = []; // Startet immer leer bei F5
        let stats = {
            totalFired: 0,
            firedTypes: new Set(),
            maxChain: 0,
            trioTriggered: false
        };

        const achievements = [{
                id: 'fire_10',
                title: 'Pyro-Anfänger',
                desc: '10 Feuerwerke geschossen',
                check: () => stats.totalFired >= 10
            }, {
                id: 'fire_35',
                title: 'Hobby-Zündler',
                desc: '35 Feuerwerke geschossen',
                check: () => stats.totalFired >= 35
            }, {
                id: 'fire_100',
                title: 'Meister der Nacht',
                desc: '100 Feuerwerke geschossen',
                check: () => stats.totalFired >= 100
            }, {
                id: 'collector',
                title: 'Sammler',
                desc: 'Jeden Typ einmal gezündet',
                check: () => {
                    return typeof fireworkData !== 'undefined' && stats.firedTypes.size >= Object.keys(fireworkData).length;
                }
            }, {
                id: 'chain_1',
                title: 'The Chain I',
                desc: '10 verbundene Feuerwerke',
                check: () => stats.maxChain >= 10
            }, {
                id: 'chain_2',
                title: 'The Chain II',
                desc: '25 verbundene Feuerwerke',
                check: () => stats.maxChain >= 25
            }, {
                id: 'chain_3',
                title: 'The Chain III',
                desc: '50 verbundene Feuerwerke',
                check: () => stats.maxChain >= 50
            }, {
                id: 'big_one_ach',
                title: 'Komodo 3000!!!',
                desc: 'So hell wie der Tag!!',
                check: () => stats.firedTypes.has('komodo3000')
            },

            // Secrets
            {
                id: 'secret_250',
                title: 'Pyro-Gott',
                secretDesc: 'Zünde eine unfassbare Menge',
                desc: '250 Feuerwerke geschossen',
                isSecret: true,
                check: () => stats.totalFired >= 250
            }, {
                id: 'the_show',
                title: 'Die Show',
                secretDesc: 'Zeig was du kannst!!',
                desc: '100 Feuerwerke in einer Kette',
                isSecret: true,
                check: () => stats.maxChain >= 100
            }, {
                id: 'trio',
                title: 'Götterdämmerung',
                secretDesc: 'Legendary',
                desc: 'Alle 3 Legendären gleichzeitig gezündet',
                isSecret: true,
                check: () => stats.trioTriggered
            }
        ];

        function updateAchievementUI() {
            const container = document.getElementById('achievement-list');
            if (!container) return;
            container.innerHTML = '';

            achievements.forEach(ach => {
                // 1. Erst prüfen und ggf. freischalten
                if (!unlockedAchievements.includes(ach.id) && ach.check()) {
                    unlockedAchievements.push(ach.id);
                    if (typeof showToast === 'function') showToast(ach.title);
                }

                // 2. JETZT erst schauen, ob es freigeschaltet ist (für die CSS Klasse)
                const isUnlockedNow = unlockedAchievements.includes(ach.id);

                const div = document.createElement('div');
                // Hier nutzen wir den aktuellsten Status
                div.className = `achievement-item ${isUnlockedNow ? 'unlocked' : ''}`;

                if (ach.isSecret && !isUnlockedNow) {
                    div.classList.add('secret');
                    div.innerHTML = `<div class="achievement-title">???</div><div class="achievement-desc">${ach.secretDesc}</div>`;
                } else {
                    // Hier erscheint das ✅ jetzt sofort beim ersten Mal
                    div.innerHTML = `<div class="achievement-title">${ach.title} ${isUnlockedNow ? '✅' : ''}</div><div class="achievement-desc">${ach.desc}</div>`;
                }
                container.appendChild(div);
            });
        }

        function showToast(msg) {
            // Einfache Benachrichtigung (könnte man noch schöner stylen)
            console.log("%c ACHIEVEMENT: " + msg, "color: #2ecc71; font-weight: bold");
        }

        function checkLegendaryTrio() {
            // Diese Logik prüft, ob die 3 Legendären in einer Kette hängen
            // Wird aufgerufen, wenn die Zündschnur startet
            return false; // Implementierung folgt unten
        }





        const menuBtn = document.getElementById('menuBtn');
        const inventoryMenu = document.getElementById('inventoryMenu');

        menuBtn.addEventListener('click', () => {
            inventoryMenu.classList.toggle('open');
        });

        let dragElement = null;

        document.querySelectorAll('.menu-item').forEach(item => {
            item.addEventListener('dragstart', (e) => {
                const type = item.dataset.type;
                const speed = item.dataset.speed;

                dragElement = document.createElement('div');
                dragElement.className = 'placed-firework dragging';
                dragElement.textContent = fireworkData[type] ? fireworkData[type].icon : item.querySelector('.menu-item-icon').textContent;
                dragElement.style.fontSize = '50px';
                document.body.appendChild(dragElement);

                e.dataTransfer.effectAllowed = 'copy';
                e.dataTransfer.setData('type', type);
                e.dataTransfer.setData('speed', speed || 'medium');
            });

            item.addEventListener('dragend', () => {
                if (dragElement) {
                    dragElement.remove();
                    dragElement = null;
                }
            });
        });

        document.addEventListener('dragover', (e) => {
            e.preventDefault();
            if (dragElement) {
                dragElement.style.left = e.clientX + 'px';
                dragElement.style.top = e.clientY + 'px';
                dragElement.style.transform = 'translate(-50%, -50%)';
            }
        });

        canvas.addEventListener('drop', (e) => {
            e.preventDefault();
            const type = e.dataTransfer.getData('type');
            const speed = e.dataTransfer.getData('speed');

            if (type && type !== 'lighter' && !type.startsWith('fuse-')) {
                const x = e.clientX;
                const y = e.clientY;

                const fw = {
                    id: Date.now(),
                    type: type,
                    speed: speed,
                    x: x,
                    y: y,
                    lit: false,
                    cooldown: 0
                };
                placedFireworks.push(fw);

                const div = document.createElement('div');
                div.className = 'placed-firework';
                div.textContent = fireworkData[type].icon;
                div.style.left = x + 'px';
                div.style.top = y + 'px';
                div.dataset.id = fw.id;
                document.body.appendChild(div);

                status.textContent = `${fireworkData[type].name} platziert! 🔥 zum Anzünden`;
            }

            if (dragElement) {
                dragElement.remove();
                dragElement = null;
            }
        });

        document.querySelectorAll('.item').forEach(item => {
            item.addEventListener('click', () => {
                const type = item.dataset.type;
                document.querySelectorAll('.item').forEach(i => i.classList.remove('selected'));

                if (type === 'lighter') {
                    isLighter = true;
                    isFuseMode = false;
                    selectedType = null;
                    fuseType = null;
                    item.classList.add('selected');
                    status.textContent = 'Klicke auf eine Zündschnur zum Anzünden';
                } else if (type.startsWith('fuse-')) {
                    isFuseMode = true;
                    isLighter = false;
                    selectedType = null;
                    fuseType = type.replace('fuse-', '');
                    fuseStart = null;
                    item.classList.add('selected');
                    status.textContent = 'Klicke auf erstes Feuerwerk, dann auf zweites zum Verbinden';
                } else {
                    isLighter = false;
                    isFuseMode = false;
                    selectedType = type;
                    fuseType = null;
                    item.classList.add('selected');
                    status.textContent = `${fireworkData[type].name} ausgewählt - Klicke zum Platzieren`;
                }
            });
        });

        canvas.addEventListener('click', (e) => {
            const x = e.clientX;
            const y = e.clientY;

            if (selectedType && !isLighter && !isFuseMode) {
                const fw = {
                    id: Date.now(),
                    type: selectedType,
                    speed: 'medium',
                    x: x,
                    y: y,
                    lit: false,
                    cooldown: 0
                };
                placedFireworks.push(fw);

                const div = document.createElement('div');
                div.className = 'placed-firework';
                div.textContent = fireworkData[selectedType].icon;
                div.style.left = x + 'px';
                div.style.top = y + 'px';
                div.dataset.id = fw.id;
                document.body.appendChild(div);

                selectedType = null;
                document.querySelectorAll('.item').forEach(i => i.classList.remove('selected'));
                status.textContent = 'Feuerwerk platziert! Wähle mehr oder zünde sie an';
            } else if (isFuseMode && fuseType) {
                const clicked = placedFireworks.find(fw =>
                    Math.abs(fw.x - x) < 30 && Math.abs(fw.y - y) < 30
                );

                if (clicked) {
                    if (!fuseStart) {
                        fuseStart = clicked;
                        status.textContent = 'Klicke auf das nächste Feuerwerk zum Verbinden';
                    } else if (fuseStart.id !== clicked.id) {
                        const existingConnection = connections.find(c =>
                            (c.from === fuseStart.id && c.to === clicked.id) ||
                            (c.from === clicked.id && c.to === fuseStart.id)
                        );

                        if (!existingConnection) {
                            connections.push({
                                from: fuseStart.id,
                                to: clicked.id,
                                speed: fuseType
                            });

                            drawConnection(fuseStart, clicked);
                            status.textContent = 'Verbindung erstellt! Klicke auf mehr Feuerwerk oder zünde an';
                        }
                        fuseStart = null;
                    }
                }
            } else if (isLighter) {
                const clicked = placedFireworks.find(fw =>
                    Math.abs(fw.x - x) < 30 && Math.abs(fw.y - y) < 30 && !fw.lit && fw.cooldown === 0
                );

                if (clicked) {
                    igniteFuse(clicked);
                }

                const clickedConnection = findConnectionAtPoint(x, y);
                if (clickedConnection) {
                    const fromFw = placedFireworks.find(fw => fw.id === clickedConnection.from);
                    if (fromFw && !fromFw.lit && fromFw.cooldown === 0) {
                        igniteFuse(fromFw);
                    }
                }
            }
        });

        function updateStatsAndCheckAchievements(fw) {
            stats.totalFired++;
            stats.firedTypes.add(fw.type);

            if (fw.type === 'komodo3000') {
                // Wir setzen dies sofort auf true, damit updateAchievementUI es direkt erkennt
                stats.firedTypes.add('komodo3000');
                updateAchievementUI();
            }

            // Sicherstellen dass getChainData existiert
            if (typeof getChainData === 'function') {
                const chain = getChainData(fw);
                if (chain.size > stats.maxChain) stats.maxChain = chain.size;
                if (chain.types.has('komodo3000') && chain.types.has('kraken') && chain.types.has('supernova')) {
                    stats.trioTriggered = true;
                }
            }
            updateAchievementUI();
        }

        function igniteFuse(fw) {
            if (!fw || fw.lit || fw.cooldown > 0) return;

            fw.lit = true;
            fw.cooldown = 100;

            // Stats & Achievements Update
            try {
                if (typeof updateStatsAndCheckAchievements === 'function') {
                    updateStatsAndCheckAchievements(fw);
                }
            } catch (e) {
                console.error("Achievement Fehler:", e);
            }

            // Visuelles Feedback
            const div = document.querySelector(`[data-id="${fw.id}"]`);
            if (div) {
                div.classList.add('lit');
                div.style.animation = 'ignite 0.5s ease infinite';
            }

            // Zündschnüre zu anderen Raketen
            const outgoingConnections = connections.filter(c => c.from === fw.id);
            outgoingConnections.forEach(conn => {
                const targetFw = placedFireworks.find(f => f.id === conn.to);
                if (targetFw && !targetFw.lit) {
                    const dx = targetFw.x - fw.x;
                    const dy = targetFw.y - fw.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    const duration = (distance / 100) * fuseSpeed[conn.speed];
                    animateFuseConnection(fw, targetFw, duration, conn.speed);
                }
            });

            // Starte das aktuelle Feuerwerk (mit kurzer Verzögerung für den Effekt)
            setTimeout(() => {
                launchFirework(fw);
                cleanupFirework(fw);
            }, 500); // 0.5 Sekunden Brennzeit bevor es hochgeht
        }




        function animateFuseConnection(fromFw, toFw, duration, speed) {
            const dx = toFw.x - fromFw.x;
            const dy = toFw.y - fromFw.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const angle = Math.atan2(dy, dx);

            // Visuelle Zündschnur erstellen
            const fuseDiv = document.createElement('div');
            fuseDiv.className = 'fuse';
            fuseDiv.style.left = fromFw.x + 'px';
            fuseDiv.style.top = fromFw.y + 'px';
            fuseDiv.style.width = '0px'; // Startet bei 0
            fuseDiv.style.transform = `rotate(${angle}rad)`;
            fuseDiv.style.transformOrigin = 'left center';
            fuseDiv.style.zIndex = '200';

            // Farbe je nach Schnelligkeit anpassen (optional)
            if (speed === 'superfast') fuseDiv.style.filter = 'hue-rotate(180deg) brightness(2)';

            document.body.appendChild(fuseDiv);

            const spark = document.createElement('div');
            spark.className = 'fuse-spark';
            fuseDiv.appendChild(spark);

            let startTime = Date.now();

            const animate = () => {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);

                fuseDiv.style.width = (distance * progress) + 'px';

                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    // Zündschnur ist angekommen!
                    fuseDiv.remove();

                    // WICHTIG: Hier wird das nächste Feuerwerk gezündet
                    // Wir suchen das Objekt neu, falls es sich geändert hat (sicherer)
                    const currentTarget = placedFireworks.find(f => f.id === toFw.id);
                    if (currentTarget) {
                        igniteFuse(currentTarget);
                    }
                }
            };

            animate();
        }

        function cleanupFirework(fw) {
            // Entfernt das Feuerwerk vom DOM und aus den Arrays
            const div = document.querySelector(`[data-id="${fw.id}"]`);
            if (div) div.remove();

            // Wir entfernen es aus placedFireworks, damit man es nicht nochmal anklicken kann
            placedFireworks = placedFireworks.filter(f => f.id !== fw.id);

            // Verbindungen aufräumen (optional, aber sauberer)
            // Wir löschen nur die visuellen Linien, die Daten brauchen wir nicht mehr
            document.querySelectorAll(`.fuse[data-from-id="${fw.id}"], .fuse[data-to-id="${fw.id}"]`).forEach(el => el.remove());
        }



        function drawConnection(from, to) {
            const line = document.createElement('div');
            line.className = 'fuse';
            const dx = to.x - from.x;
            const dy = to.y - from.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const angle = Math.atan2(dy, dx);

            line.style.left = from.x + 'px';
            line.style.top = from.y + 'px';
            line.style.width = distance + 'px';
            line.style.transform = `rotate(${angle}rad)`;
            line.style.transformOrigin = 'left center';
            line.style.opacity = '0.6';
            line.dataset.fromId = from.id;
            line.dataset.toId = to.id;

            document.body.appendChild(line);
        }

        function findConnectionAtPoint(x, y) {
            for (const conn of connections) {
                const from = placedFireworks.find(fw => fw.id === conn.from);
                const to = placedFireworks.find(fw => fw.id === conn.to);

                if (from && to) {
                    const dx = to.x - from.x;
                    const dy = to.y - from.y;
                    const length = Math.sqrt(dx * dx + dy * dy);

                    const px = x - from.x;
                    const py = y - from.y;

                    const dot = (px * dx + py * dy) / (length * length);

                    if (dot >= 0 && dot <= 1) {
                        const closestX = from.x + dot * dx;
                        const closestY = from.y + dot * dy;
                        const dist = Math.sqrt((x - closestX) ** 2 + (y - closestY) ** 2);

                        if (dist < 10) {
                            return conn;
                        }
                    }
                }
            }
            return null;
        }

        // 1. ERSETZE DEINE ALTE launchFirework FUNKTION HIERMIT:
        function launchFirework(fw) {
            const data = fireworkData[fw.type];

            // Standard Raketen-Animation (wird oft wiederverwendet)
            const standardRocket = (height, burstFunc) => {
                animateRocket(fw.x, fw.y, fw.x, fw.y - height, burstFunc);
            };

            switch (fw.type) {
                // --- BESTEHENDE ---
                case 'rocket':
                    animateRocket(fw.x, fw.y, fw.x, fw.y - 500, () => {
                        createExplosion(fw.x, fw.y - 500, data.colors, 50, 3);
                    }, 1.5);
                    break;
                case 'giant':
                    standardRocket(350, () => {
                        createExplosion(fw.x, fw.y - 350, data.colors, 300, 15);
                        setTimeout(() => createExplosion(fw.x, fw.y - 350, data.colors, 200, 10), 200);
                    });
                    break;
                case 'fountain':
                    for (let i = 0; i < 45; i++) setTimeout(() => createFountain(fw.x, fw.y, data.colors), i * 100);
                    break;
                case 'roman':
                    for (let i = 0; i < 8; i++) {
                        setTimeout(() => {
                            createExplosion(fw.x, fw.y - 80, [data.colors[i % data.colors.length]], 60, 4);
                        }, i * 400);
                    }
                    break;
                case 'sparkler':
                    for (let i = 0; i < 100; i++) setTimeout(() => createSparkle(fw.x, fw.y, data.colors), i * 50);
                    break;
                case 'battery':
                    for (let i = 0; i < 12; i++) {
                        setTimeout(() => {
                            const offsetX = (i % 3 - 1) * 30;
                            const targetY = fw.y - 150 - Math.random() * 50;
                            animateRocket(fw.x + offsetX, fw.y, fw.x + offsetX, targetY, () => {
                                createExplosion(fw.x + offsetX, targetY, [data.colors[i % data.colors.length]], 80, 5);
                            });
                        }, i * 200);
                    }
                    break;
                case 'volcano':
                    for (let i = 0; i < 50; i++) setTimeout(() => createVolcano(fw.x, fw.y, data.colors), i * 80);
                    break;
                case 'multishot':
                    for (let i = 0; i < 5; i++) {
                        setTimeout(() => {
                            const angle = (i * 72) * Math.PI / 180;
                            const x = fw.x + Math.cos(angle) * 100;
                            const y = fw.y - 100 + Math.sin(angle) * 100;
                            createExplosion(x, y, data.colors, 100, 6);
                        }, i * 300);
                    }
                    break;
                case 'spiral':
                    for (let i = 0; i < 20; i++) {
                        setTimeout(() => {
                            const angle = (i * 36) * Math.PI / 180;
                            const radius = i * 10;
                            const x = fw.x + Math.cos(angle) * radius;
                            const y = fw.y - 80 + Math.sin(angle) * radius;
                            createExplosion(x, y, [data.colors[i % data.colors.length]], 40, 3);
                        }, i * 100);
                    }
                    break;
                case 'nova':
                    standardRocket(250, () => {
                        for (let ring = 0; ring < 3; ring++) {
                            setTimeout(() => createExplosion(fw.x, fw.y - 250, data.colors, 200 + ring * 50, 12), ring * 300);
                        }
                    });
                    break;
                case 'finale':
                    for (let i = 0; i < 20; i++) {
                        setTimeout(() => {
                            const offsetX = (Math.random() - 0.5) * 200;
                            const targetY = fw.y - 150 - Math.random() * 100;
                            animateRocket(fw.x + offsetX, fw.y, fw.x + offsetX, targetY, () => {
                                createExplosion(fw.x + offsetX, targetY, data.colors, 50, 8);
                            });
                        }, i * 100);
                    }
                    break;
                case 'waterfall':
                    standardRocket(300, () => {
                        for (let i = 0; i < 43; i++) setTimeout(() => createWaterfall(fw.x, fw.y - 300, data.colors), i * 50);
                    });
                    break;

                    // --- NEUE FEUERWERKE ---

                case 'frog': // 🐸 Knallfrosch
                    createFrogEffect(fw.x, fw.y, data.colors);
                    break;

                case 'silvergold':
                    standardRocket(400, () => {
                        const flip = Math.random() > 0.5;
                        const colorLeft = flip ? ['#c0c0c0', '#ffffff'] : ['#ffd700', '#ffcc00'];
                        const colorRight = flip ? ['#ffd700', '#ffcc00'] : ['#c0c0c0', '#ffffff'];

                        createDirectionalExplosion(fw.x, fw.y - 400, colorLeft, -6, 0);
                        createDirectionalExplosion(fw.x, fw.y - 400, colorRight, 6, 0);
                    });
                    break;

                case 'peony': // 🌸 Pfingstrose (Sauberer Kreis, keine Schweife)
                    standardRocket(250, () => createShapeExplosion(fw.x, fw.y - 250, data.colors, 'sphere', 200));
                    break;

                case 'chrysanthemum': // 🏵️ Chrysantheme (Mit Schweif)
                    standardRocket(250, () => createExplosion(fw.x, fw.y - 250, data.colors, 250, 10)); // Standard Explosion hat Schweif
                    break;

                case 'willow': // 🌳 Trauerweide (Fällt langsam, langliebig)
                    standardRocket(300, () => createWillowEffect(fw.x, fw.y - 300, data.colors));
                    break;

                case 'palm': // 🌴 Palme (Dicke Äste)
                    animateRocket(fw.x, fw.y, fw.x, fw.y - 550, () => {
                        createPalmEffect(fw.x, fw.y - 550, data.colors);
                    }, 1.5);
                    break;

                case 'crossette': // ✖️ Crossette (Teilt sich in 4)
                    standardRocket(200, () => {
                        createExplosion(fw.x, fw.y - 200, data.colors, 50, 8);
                        setTimeout(() => {
                            createCrossEffect(fw.x, fw.y - 200, data.colors);
                        }, 200);
                    });
                    break;

                case 'strobes': // ⚡ Stroboskop
                    standardRocket(200, () => createStrobeEffect(fw.x, fw.y - 200, ['#ffffff']));
                    break;

                case 'crackling': // 🔥 Knisterregen
                    standardRocket(200, () => createCracklingEffect(fw.x, fw.y - 200, data.colors));
                    break;

                case 'ringshell': // ⭕ Ring
                    standardRocket(250, () => createShapeExplosion(fw.x, fw.y - 250, data.colors, 'ring', 150));
                    break;

                case 'heart': // ❤️ Herz
                    standardRocket(250, () => createShapeExplosion(fw.x, fw.y - 250, data.colors, 'heart', 150));
                    break;

                case 'saturn': // 🪐 Saturn (Kugel + Ring)
                    standardRocket(250, () => {
                        createExplosion(fw.x, fw.y - 250, [data.colors[0]], 50, 4); // Planet
                        createShapeExplosion(fw.x, fw.y - 250, [data.colors[1]], 'ring', 120); // Ring
                    });
                    break;

                case 'kamuro': // 👑 Kamuro (Große goldene Krone, sehr lange Brenndauer)
                    standardRocket(350, () => createWillowEffect(fw.x, fw.y - 350, data.colors, true));
                    break;

                case 'brocade': // 🎭 Brokade
                    standardRocket(250, () => createExplosion(fw.x, fw.y - 250, data.colors, 200, 9));
                    break;

                case 'glitter': // 💎 Glitzer
                    // 1. Zuerst side berechnen (wie beim Comet, damit targetX definiert ist)

                    const sX = fw.x;
                    const sY = fw.y;
                    const tX = fw.x;
                    const tY = fw.y - 500;

                    // 2. Animation starten (0.6 ist schön schnell!)
                    animateRocket(sX, sY, tX, tY, () => {
                        // Explosion oben
                        createSparkle(tX, tY, data.colors);
                        createCracklingEffect(tX, tY, data.colors);
                    }, 2.6);
                    break;

                case 'comet':
                    const side = (Math.random() - 0.5) * 400; // Fliegt zufällig nach links oder rechts
                    animateRocket(fw.x, fw.y, fw.x + side, fw.y - 500, () => {
                        createDirectionalExplosion(fw.x + side, fw.y - 500, data.colors, side / 50, -2);
                    }, 2.0);
                    break;

                case 'mine': // ⚫ Mine (Explosion vom Boden nach oben)
                    createMineEffect(fw.x, fw.y, data.colors);
                    break;

                case 'zipper': // ⚡ Reißverschluss
                    createZipperEffect(fw.x, fw.y, data.colors);
                    break;

                case 'rainbow': // 🌈 Regenbogen
                    standardRocket(250, () => createRainbowEffect(fw.x, fw.y - 250, data.colors));
                    break;
                case 'komodo3000':
                    // 1. Phase: Zischen am Boden (Vorlaufzeit)
                    for (let i = 0; i < 50; i++) {
                        setTimeout(() => createSparkle(fw.x, fw.y, ['#ff4500', '#ffff00']), i * 50);
                    }

                    // 2. Phase: Extrem langsamer Aufstieg (nach 3 Sekunden warten)
                    setTimeout(() => {
                        // Hier wird die Rakete animiert: Aufstiegsdauer massiv erhöht
                        animateRocket(fw.x, fw.y, fw.x, fw.y - 600, () => {

                            // 3. Phase: DER FLASH (Länger und heller)
                            const flashDiv = document.createElement('div');
                            flashDiv.style.position = 'fixed';
                            flashDiv.style.inset = '0';
                            flashDiv.style.backgroundColor = 'white';
                            flashDiv.style.zIndex = '9999';
                            flashDiv.style.opacity = '1';
                            document.body.appendChild(flashDiv);

                            // Flash langsam ausblenden
                            let flashOpacity = 1;
                            const fadeFlash = setInterval(() => {
                                flashOpacity -= 0.02;
                                flashDiv.style.opacity = flashOpacity;
                                if (flashOpacity <= 0) {
                                    clearInterval(fadeFlash);
                                    flashDiv.remove();
                                }
                            }, 50);

                            // 4. Phase: SCREEN SHAKE
                            document.body.classList.add('shaking');
                            setTimeout(() => document.body.classList.remove('shaking'), 4000); // 4 Sekunden Beben

                            // 5. Phase: Die Gigantische Explosion
                            createExplosion(fw.x, fw.y - 600, data.colors, 1200, 30);

                            // Viele versetzte Nach-Explosionen
                            for (let i = 0; i < 30; i++) {
                                setTimeout(() => {
                                    const rx = fw.x + (Math.random() - 0.5) * 800;
                                    const ry = (fw.y - 600) + (Math.random() - 0.5) * 600;
                                    createExplosion(rx, ry, data.colors, 300, 15);
                                }, 200 + i * 100);
                            }
                        }, 10.0); // 10.0 = Sehr langsame Aufstiegs-Geschwindigkeit
                    }, 3000); // 3 Sekunden Wartezeit am Boden
                    break;

                case 'ufo':
                    standardRocket(300, () => {
                        for (let i = 0; i < 3; i++) {
                            setTimeout(() => {
                                createShapeExplosion(fw.x, fw.y - 300, data.colors, 'ring', 40);
                                // Die Ringe "wobbeln" weg
                            }, i * 300);
                        }
                    });
                    break;

                case 'beehive':
                    standardRocket(200, () => {
                        for (let i = 0; i < 40; i++) {
                            // "Bienen" fliegen wild umher
                            particles.push({
                                x: fw.x,
                                y: fw.y - 200,
                                vx: (Math.random() - 0.5) * 15,
                                vy: (Math.random() - 0.5) * 15,
                                color: i % 2 === 0 ? '#ff0' : '#000',
                                life: 100,
                                maxLife: 100,
                                size: 2,
                                gravity: 0
                            });
                        }
                    });
                    break;

                case 'kraken':
                    // Steigt extrem hoch auf
                    animateRocket(fw.x, fw.y, fw.x, fw.y - 450, () => {
                        const numTentacles = 20; // Mehr Tentakel
                        for (let i = 0; i < numTentacles; i++) {
                            setTimeout(() => {
                                const angle = (Math.PI * 2 / numTentacles) * i;
                                // Tentakel-Funktion mit Explosions-Finale am Ende
                                createKrakenTentacle(fw.x, fw.y - 650, angle, data.colors);
                            }, i * 50);
                        }
                    }, 2.0);
                    break;

                    // NEU: NOVA (Legendär)
                case 'supernova':
                    animateRocket(fw.x, fw.y, fw.x, fw.y - 500, () => {
                        // Stufe 1: Der Implosions-Effekt (Partikel ziehen sich kurz zusammen)
                        // Stufe 2: Massive Explosion
                        const particleCount = 1500; // Massiv erhöht
                        for (let i = 0; i < particleCount; i++) {
                            const angle = Math.random() * Math.PI * 2;
                            // Unterschiedliche Geschwindigkeiten für Tiefenwirkung
                            const speed = Math.random() * 15;
                            particles.push({
                                x: fw.x,
                                y: fw.y - 500,
                                vx: Math.cos(angle) * speed,
                                vy: Math.sin(angle) * speed,
                                color: i % 2 === 0 ? '#ffffff' : data.colors[i % data.colors.length],
                                life: 200 + Math.random() * 100,
                                maxLife: 300,
                                size: Math.random() * 5,
                                gravity: 0.02 // Fast schwerelos
                            });
                        }

                        // Stufe 3: Der Schockwellen-Ring
                        createShapeExplosion(fw.x, fw.y - 500, ['#fff'], 'ring', 200);

                        // Stufe 4: Screen Effects
                        const flash = document.createElement('div');
                        flash.style.cssText = "position:fixed;inset:0;background:white;z-index:9999;opacity:0.8;";
                        document.body.appendChild(flash);

                        setTimeout(() => {
                            flash.remove();
                        }, 1500);
                    }, 1.0);
                    break;

                    // NEU: BODENWIRBEL
                case 'spinner':
                    let spinTime = 0;
                    const spin = setInterval(() => {
                        const angle = spinTime * 0.5;
                        for (let i = 0; i < 3; i++) {
                            const a = angle + (Math.PI * 2 / 3) * i;
                            particles.push({
                                x: fw.x,
                                y: fw.y - 10,
                                vx: Math.cos(a) * 8,
                                vy: Math.sin(a) * 8 - 2,
                                color: data.colors[spinTime % 3],
                                life: 40,
                                maxLife: 40,
                                size: 3,
                                gravity: 0.2
                            });
                        }
                        spinTime++;
                        if (spinTime > 60) clearInterval(spin);
                    }, 50);
                    break;

                    // NEU: SATELLIT
                case 'satellite':
                    animateRocket(fw.x, fw.y, fw.x, fw.y - 550, () => {
                        let orbit = 0;
                        const mainColor = data.colors[0]; // Nutzt hauptsächlich die erste Farbe
                        const fly = setInterval(() => {
                            const ox = fw.x + Math.cos(orbit) * 120;
                            const oy = (fw.y - 550) + Math.sin(orbit) * 60;
                            // Nur selten ein weißer Glitzer-Blitz
                            const color = Math.random() > 0.9 ? '#ffffff' : mainColor;
                            createExplosion(ox, oy, [color], 20, 1);
                            orbit += 0.2;
                            if (orbit > Math.PI * 6) clearInterval(fly);
                        }, 60);
                    }, 2.5);
                    break;
                    // --- 🎨 PAINT SPLASH (Bleibt länger am Himmel hängen) ---
                case 'paint':
                    standardRocket(450, () => {
                        for (let i = 0; i < 60; i++) {
                            const angle = Math.random() * Math.PI * 2;
                            const speed = 2 + Math.random() * 8;
                            particles.push({
                                x: fw.x,
                                y: fw.y - 450,
                                vx: Math.cos(angle) * speed,
                                vy: Math.sin(angle) * speed,
                                color: data.colors[Math.floor(Math.random() * data.colors.length)],
                                life: 250, // Sehr langes Leben
                                maxLife: 250,
                                size: 6 + Math.random() * 6, // Dicke "Farbkleckse"
                                gravity: 0.02, // Fast keine Schwerkraft, schwebt wie Farbe im Wasser
                                friction: 0.96 // Verlangsamt sich schnell für den "Splash"-Look
                            });
                        }
                    });
                    break;

                    // --- 🌌 NEBULA (Statischer Gasnebel) ---
                case 'nebula':
                    animateRocket(fw.x, fw.y, fw.x, fw.y - 500, () => {
                        for (let i = 0; i < 250; i++) {
                            const angle = Math.random() * Math.PI * 2;
                            const speed = Math.random() * 4;
                            particles.push({
                                x: fw.x,
                                y: fw.y - 500,
                                vx: Math.cos(angle) * speed,
                                vy: Math.sin(angle) * speed,
                                color: data.colors[Math.floor(Math.random() * data.colors.length)],
                                life: 200 + Math.random() * 100,
                                maxLife: 300,
                                size: 2 + Math.random() * 4,
                                gravity: -0.01, // Steigt ganz leicht auf wie Gas
                                friction: 0.98, // Wird langsam langsamer
                                isNebula: true
                            });
                        }
                    }, 1.8);
                    break;

                    // --- 🪼 MINI-MEDUSA (Eigenständige Logik) ---
                case 'medusa':
                    animateRocket(fw.x, fw.y, fw.x, fw.y - 400, () => {
                        const numTentacles = 5;
                        for (let i = 0; i < numTentacles; i++) {
                            const angle = (Math.PI * 2 / numTentacles) * i;
                            // Wir rufen hier eine spezielle, etwas kleinere Tentakel-Funktion auf
                            createMedusaTentacle(fw.x, fw.y - 400, angle, data.colors);
                        }
                    }, 2.0);
                    break;

                    // --- ✨ GLÜHWÜRMCHEN (Zappeln im Zickzack) ---
                case 'fireflies':
                    standardRocket(400, () => {
                        for (let i = 0; i < 40; i++) {
                            particles.push({
                                x: fw.x,
                                y: fw.y - 400,
                                vx: (Math.random() - 0.5) * 5,
                                vy: (Math.random() - 0.5) * 5,
                                color: data.colors[0],
                                life: 150,
                                maxLife: 150,
                                size: 2,
                                gravity: 0,
                                isFirefly: true // Neues Flag für Zickzack-Bewegung
                            });
                        }
                    });
                    break;

                    // --- 🕳️ GRAVITATIONS-BRUNNEN (Zieht Partikel an) ---
                case 'gravity_well':
                    standardRocket(400, () => {
                        const centerX = fw.x;
                        const centerY = fw.y - 400;
                        // Erst eine Explosion...
                        createExplosion(centerX, centerY, data.colors, 150, 10);
                        // ...dann eine "Singularität", die nach 1 Sekunde alles einsaugt
                        setTimeout(() => {
                            particles.forEach(p => {
                                const dx = centerX - p.x;
                                const dy = centerY - p.y;
                                const dist = Math.sqrt(dx * dx + dy * dy);
                                if (dist < 300) {
                                    p.vx += dx * 0.05;
                                    p.vy += dy * 0.05;
                                }
                            });
                        }, 500);
                    });
                    break;

                case 'chriz_battery':
                    // ChriZ's 30-Sekunden Fächerbatterie mit Finale
                    let shotCount = 0;
                    const totalShots = 50; // 25 Sekunden normale Schüsse
                    const finaleShots = 30; // 5 Sekunden Finale

                    // Boom Context initialisieren (Web Audio API)
                    const audioCtx = new(window.AudioContext || window.webkitAudioContext)();

                    // Hilfsfunktion für Schuss-sfx
                    const playShot = (pitch = 1.0, duration = 0.1) => {
                        const osc = audioCtx.createOscillator();
                        const gain = audioCtx.createGain();
                        osc.connect(gain);
                        gain.connect(audioCtx.destination);

                        osc.frequency.value = 80 * pitch;
                        osc.type = 'sawtooth';
                        gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
                        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);

                        osc.start();
                        osc.stop(audioCtx.currentTime + duration);
                    };

                    // Hilfsfunktion für BOOM
                    const playBurst = () => {
                        const noise = audioCtx.createBufferSource();
                        const buffer = audioCtx.createBuffer(1, audioCtx.sampleRate * 0.3, audioCtx.sampleRate);
                        const data = buffer.getChannelData(0);
                        for (let i = 0; i < buffer.length; i++) {
                            data[i] = Math.random() * 2 - 1;
                        }
                        noise.buffer = buffer;

                        const filter = audioCtx.createBiquadFilter();
                        filter.type = 'bandpass';
                        filter.frequency.value = 2000;

                        const gain = audioCtx.createGain();
                        gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
                        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);

                        noise.connect(filter);
                        filter.connect(gain);
                        gain.connect(audioCtx.destination);
                        noise.start();
                    };

                    // Normale Phase (25 Sekunden)
                    const normalInterval = setInterval(() => {
                        if (shotCount >= totalShots) {
                            clearInterval(normalInterval);

                            // FINALE Phase (5 Sekunden)
                            let finaleCount = 0;
                            const finaleInterval = setInterval(() => {
                                if (finaleCount >= finaleShots) {
                                    clearInterval(finaleInterval);
                                    // Großes Abschluss-Feuerwerk
                                    setTimeout(() => {
                                        for (let i = 0; i < 5; i++) {
                                            setTimeout(() => {
                                                const offsetX = (Math.random() - 0.5) * 300;
                                                animateRocket(fw.x + offsetX, fw.y, fw.x + offsetX, fw.y - 450, () => {
                                                    createExplosion(fw.x + offsetX, fw.y - 450, data.colors, 200, 15);
                                                    createCracklingEffect(fw.x + offsetX, fw.y - 450, ['#ffd700', '#ffffff']);
                                                    playBurst();
                                                }, 2.0);
                                            }, i * 200);
                                        }
                                    }, 100);
                                    return;
                                }

                                // Finale: Doppelte Schussrate mit mehr Effekten
                                const angle = -Math.PI / 2 + (Math.random() - 0.5) * (Math.PI / 3);
                                const offsetX = (Math.random() - 0.5) * 100;
                                const targetY = fw.y - 650 - Math.random() * 150;
                                const finalTargetX = fw.x + offsetX + Math.cos(angle) * 150;

                                playShot(1.2 + Math.random() * 0.3, 0.08);

                                animateRocket(fw.x + offsetX, fw.y, finalTargetX, targetY, () => {
                                    const colorSet = [
                                        data.colors[finaleCount % data.colors.length],
                                        data.colors[(finaleCount + 1) % data.colors.length]
                                    ];
                                    createExplosion(finalTargetX, targetY, colorSet, 80, 8);

                                    // Jeder 3. Schuss mit Crackling
                                    if (finaleCount % 3 === 0) {
                                        createCracklingEffect(finalTargetX, targetY, ['#ffd700', '#ffaa00']);
                                    }
                                    playBurst();
                                }, 1.5);

                                finaleCount++;
                            }, 167); // ~6 Schüsse pro Sekunde im Finale
                            return;
                        }

                        // Normaler Fächerschuss
                        const fanAngle = -Math.PI / 2 + (shotCount % 5 - 2) * (Math.PI / 12);
                        const targetX = fw.x + Math.cos(fanAngle) * 1000;
                        const targetY = fw.y - 600 - Math.random() * 100;

                        playShot(1.0 + Math.random() * 0.2, 0.1);

                        animateRocket(fw.x, fw.y, targetX, targetY, () => {
                            const colorIndex = shotCount % data.colors.length;
                            const burstColors = [data.colors[colorIndex], data.colors[(colorIndex + 1) % data.colors.length]];

                            // Variiere die Effekte
                            if (shotCount % 7 === 0) {
                                // Crackling-Effekt
                                createExplosion(targetX, targetY, burstColors, 60, 6);
                                createCracklingEffect(targetX, targetY, ['#ffd700', '#ff8c00']);
                            } else if (shotCount % 5 === 0) {
                                // Ring-Effekt
                                createShapeExplosion(targetX, targetY, burstColors, 'ring', 50);
                            } else {
                                // Standard Explosion
                                createExplosion(targetX, targetY, burstColors, 50, 6);
                            }
                            playBurst();
                        }, 1.8);

                        shotCount++;
                    }, 500); // Ein Schuss alle 0.5 Sekunden
                    break;
            }
        }

        // --- 2. FÜGE DIESE NEUEN HILFSFUNKTIONEN IN DEINEN CODE EIN ---
        // (Am besten unter die existing createExplosion Funktion)

        function createShapeExplosion(x, y, colors, shape, count) {
            for (let i = 0; i < count; i++) {
                let pX, pY;
                const angle = (Math.PI * 2 * i) / count;

                if (shape === 'heart') {
                    // Herz-Formel
                    const t = angle;
                    const r = 3; // Skalierung
                    pX = 16 * Math.pow(Math.sin(t), 3);
                    pY = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
                    pX *= r;
                    pY *= r;
                } else if (shape === 'ring') {
                    pX = Math.cos(angle) * 80;
                    pY = Math.sin(angle) * 80;
                } else if (shape === 'sphere') {
                    const r = Math.random() * 80;
                    pX = Math.cos(angle) * r;
                    pY = Math.sin(angle) * r;
                }

                particles.push({
                    x: x,
                    y: y,
                    vx: pX * 0.1, // Geschwindigkeit basierend auf Position
                    vy: pY * 0.1,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    life: 80,
                    maxLife: 80,
                    size: 3,
                    gravity: 0.1
                });
            }
        }

        function createMedusaTentacle(startX, startY, startAngle, colors) {
            let curX = startX;
            let curY = startY;
            let angle = startAngle;
            let segments = 35; // Etwas kürzer als der Kraken

            for (let i = 0; i < segments; i++) {
                setTimeout(() => {
                    angle += Math.sin(i * 0.5) * 0.3; // Schlängel-Bewegung
                    curX += Math.cos(angle) * 8;
                    curY += Math.sin(angle) * 8;

                    particles.push({
                        x: curX,
                        y: curY,
                        vx: (Math.random() - 0.5) * 1,
                        vy: (Math.random() - 0.5) * 1,
                        color: colors[i % colors.length],
                        life: 50,
                        maxLife: 50,
                        size: 3,
                        gravity: 0.03
                    });

                }, i * 30);
            }
        }

        function createWillowEffect(x, y, colors, isKamuro = false) {
            const count = isKamuro ? 200 : 100;
            const speedVar = isKamuro ? 8 : 5;
            for (let i = 0; i < count; i++) {
                const angle = Math.random() * Math.PI * 2;
                const speed = Math.random() * speedVar;
                particles.push({
                    x: x,
                    y: y,
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    life: isKamuro ? 150 : 100, // Leben länger
                    maxLife: isKamuro ? 150 : 100,
                    size: 2,
                    gravity: 0.15 // Ziehen schneller nach unten für Weiden-Effekt
                });
            }
        }

        function createPalmEffect(x, y, colors) {
            // Erzeugt dicke "Äste"
            for (let i = 0; i < 8; i++) {
                const angle = (Math.PI * 2 * i) / 8;
                for (let j = 0; j < 15; j++) {
                    const speed = 5 + j * 0.5;
                    particles.push({
                        x: x,
                        y: y,
                        vx: Math.cos(angle) * speed,
                        vy: Math.sin(angle) * speed,
                        color: colors[0],
                        life: 60 + j * 2,
                        maxLife: 80,
                        size: 4, // Dickere Partikel
                        gravity: 0.1
                    });
                }
            }
        }

        function createFrogEffect(x, y, colors) {
            let jumps = 0;
            const maxJumps = 12; // Mehr Sprünge!
            let curX = x;
            let curY = y;

            const doJump = () => {
                if (jumps >= maxJumps) {
                    createExplosion(curX, curY, colors, 40, 1); // Finaler Knall
                    return;
                }

                const jumpDir = (Math.random() - 0.5) * 450; // Weite Sprünge
                const jumpHeight = 10 + Math.random() * 15;

                // Partikel für den aktuellen Sprung
                for (let i = 0; i < 8; i++) {
                    particles.push({
                        x: curX,
                        y: curY,
                        vx: jumpDir / 15 + (Math.random() - 0.5) * 5,
                        vy: -jumpHeight,
                        color: '#32cd32', // Giftgrün
                        life: 30,
                        maxLife: 30,
                        size: 4,
                        gravity: 0.6
                    });
                }

                curX += jumpDir;
                jumps++;
                setTimeout(doJump, 300);
            };
            doJump();
        }

        function createDirectionalExplosion(x, y, colors, vxBias, vyBias) {
            for (let i = 0; i < 50; i++) {
                const angle = Math.random() * Math.PI * 2;
                const speed = Math.random() * 5;
                particles.push({
                    x: x,
                    y: y,
                    vx: Math.cos(angle) * speed + vxBias,
                    vy: Math.sin(angle) * speed + vyBias,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    life: 60,
                    maxLife: 60,
                    size: 3,
                    gravity: 0.1
                });
            }
        }

        function createCrossEffect(x, y, colors) {
            // 4 Richtungen
            const dirs = [
                [1, 0],
                [-1, 0],
                [0, 1],
                [0, -1]
            ];
            dirs.forEach(dir => {
                for (let i = 0; i < 10; i++) {
                    particles.push({
                        x: x,
                        y: y,
                        vx: dir[0] * (5 + i),
                        vy: dir[1] * (5 + i),
                        color: colors[0],
                        life: 40,
                        maxLife: 40,
                        size: 3,
                        gravity: 0
                    });
                }
            });
        }

        function createMineEffect(x, y, colors) {
            // Fächer vom Boden aus
            for (let i = 0; i < 50; i++) {
                const angle = -Math.PI / 2 + (Math.random() - 0.5); // Hauptsächlich nach oben
                const speed = 10 + Math.random() * 10;
                particles.push({
                    x: x,
                    y: y,
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    life: 70,
                    maxLife: 70,
                    size: 3,
                    gravity: 0.2
                });
            }
        }

        function createZipperEffect(x, y, colors) {
            // Läuft horizontal
            for (let i = 0; i < 10; i++) {
                setTimeout(() => {
                    createExplosion(x + (i * 40) - 0, y - 0, colors, 30, 2);
                }, i * 50);
            }
        }

        function createRainbowEffect(x, y, colors) {
            // Konzentrische Bögen
            colors.forEach((color, index) => {
                setTimeout(() => {
                    createShapeExplosion(x, y, [color], 'ring', 100 + index * 20);
                }, index * 100);
            });
        }

        function createStrobeEffect(x, y, colors) {
            for (let i = 0; i < 1000; i++) {
                const angle = Math.random() * Math.PI * 2;
                const speed = Math.random() * 12;
                particles.push({
                    x: x,
                    y: y,
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed,
                    color: '#ffffff',
                    life: 25,
                    maxLife: 5,
                    size: 17,
                    gravity: 0.05,
                    isStrobe: true // Neues Flag für die animate-Schleife
                });
            }
        }

        function createCracklingEffect(x, y, colors) {
            for (let i = 0; i < 80; i++) {
                const angle = Math.random() * Math.PI * 2;
                const speed = Math.random() * 8;
                particles.push({
                    x: x,
                    y: y,
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    life: Math.random() * 80, // Zufällige Lebensdauer für "Poppen"
                    maxLife: 80,
                    size: 2,
                    gravity: 0.1
                });
            }
        }

        // Hilfsfunktion für Kraken-Tentakel
        function createKrakenTentacle(startX, startY, startAngle, colors) {
            let curX = startX;
            let curY = startY;
            let angle = startAngle;
            let segments = 50; // Länge der Tentakel

            for (let i = 0; i < segments; i++) {
                setTimeout(() => {
                    // Wellenbewegung
                    angle += Math.sin(i * 0.3) * 0.2;
                    curX += Math.cos(angle) * 12;
                    curY += Math.sin(angle) * 12;

                    // Tentakel-Spur
                    particles.push({
                        x: curX,
                        y: curY,
                        vx: (Math.random() - 0.5) * 1,
                        vy: (Math.random() - 0.5) * 1,
                        color: colors[i % colors.length],
                        life: 60,
                        maxLife: 60,
                        size: 4 - (i * 0.05),
                        gravity: 0.02
                    });

                    // FINALE: Am Ende des Tentakels eine Mini-Explosion
                    if (i === segments - 1) {
                        createExplosion(curX, curY, [colors[0], '#fff'], 160, 8);
                        // Optional: Kleine "Söhne" des Kraken
                        for (let j = 0; j < 3; j++) {
                            setTimeout(() => createExplosion(curX + (Math.random() - 0.5) * 40, curY + (Math.random() - 0.5) * 40, colors, 30, 3), 200);
                        }
                    }
                }, i * 25);
            }
        }

        function animateRocket(startX, startY, endX, endY, onComplete, speed = 1.0) {
            const dx = endX - startX;
            const dy = endY - startY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            // Dauer basierend auf Distanz geteilt durch Speed
            const duration = (distance / speed) * 5;
            let startTime = Date.now();

            function update() {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);

                const currentX = startX + dx * progress;
                const currentY = startY + dy * progress;

                // Aufstiegs-Partikel (Schweif)
                particles.push({
                    x: currentX,
                    y: currentY,
                    vx: (Math.random() - 0.5) * 2,
                    vy: (Math.random() - 0.5) * 2,
                    color: '#ffaa00',
                    life: 20,
                    maxLife: 20,
                    size: 2,
                    gravity: 0.05
                });

                if (progress < 1) {
                    requestAnimationFrame(update);
                } else {
                    onComplete();
                }
            }
            update();
        }

        function createWaterfall(x, y, colors) {
            for (let i = 0; i < 12; i++) {
                const angle = Math.PI / 6 + (Math.random() - 0.5) * 0.3;
                const speed = 2 + Math.random() * 2;
                particles.push({
                    x: x,
                    y: y,
                    vx: Math.cos(angle) * speed * (Math.random() > 0.5 ? 1 : -1),
                    vy: Math.sin(angle) * speed,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    life: 120,
                    maxLife: 120,
                    size: 2 + Math.random() * 2,
                    gravity: 0.15
                });
            }
        }

        function createExplosion(x, y, colors, count, speed) {
            for (let i = 0; i < count; i++) {
                const angle = (Math.PI * 2 * i) / count;
                const velocity = speed + Math.random() * 2;
                particles.push({
                    x: x,
                    y: y,
                    vx: Math.cos(angle) * velocity,
                    vy: Math.sin(angle) * velocity,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    life: 100,
                    maxLife: 100,
                    size: 3 + Math.random() * 3,
                    gravity: 0.15
                });
            }
        }

        function createFountain(x, y, colors) {
            for (let i = 0; i < 10; i++) {
                const angle = -Math.PI / 2 + (Math.random() - 0.5) * 0.8;
                const speed = 5 + Math.random() * 3;
                particles.push({
                    x: x,
                    y: y,
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    life: 120,
                    maxLife: 120,
                    size: 2 + Math.random() * 2,
                    gravity: 0.2
                });
            }
        }

        function createSparkle(x, y, colors) {
            for (let i = 0; i < 8; i++) {
                const angle = Math.random() * Math.PI * 2;
                const speed = Math.random() * 3;
                particles.push({
                    x: x,
                    y: y,
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    life: 40,
                    maxLife: 40,
                    size: 2,
                    gravity: 0.05
                });
            }
        }

        function createVolcano(x, y, colors) {
            for (let i = 0; i < 15; i++) {
                const angle = -Math.PI / 2 + (Math.random() - 0.5) * 1.2;
                const speed = 6 + Math.random() * 4;
                particles.push({
                    x: x,
                    y: y,
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    life: 80,
                    maxLife: 80,
                    size: 3 + Math.random() * 3,
                    gravity: 0.18
                });
            }
        }

        function animate() {
            let wind = 0.02;
            ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            particles = particles.filter(p => {
                p.vx += wind;
                p.x += p.vx;
                p.y += p.vy;
                p.vy += p.gravity;
                p.life--;

                if (p.isNebula) {
                    p.size += 0.02; // Partikel werden langsam größer und "diffuser"
                }

                if (p.isStrobe) {
                    // Wechselt jeden Frame zwischen Farbe und Transparent
                    p.color = (Math.floor(p.life / 2) % 2 === 0) ? '#ffffff' : 'transparent';
                }

                // NEU: Reibung (Friction) für den Paint Splash Effekt
                if (p.friction) {
                    p.vx *= p.friction;
                    p.vy *= p.friction;
                }

                // NEU: Zickzack für Glühwürmchen
                if (p.isFirefly) {
                    p.vx += (Math.random() - 0.5) * 0.8;
                    p.vy += (Math.random() - 0.5) * 0.8;
                }

                const alpha = p.life / p.maxLife;

                ctx.globalAlpha = alpha;
                ctx.fillStyle = p.color;
                ctx.shadowBlur = 15;
                ctx.shadowColor = p.color;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();

                return p.life > 0;
            });

            ctx.globalAlpha = 1;
            ctx.shadowBlur = 0;

            requestAnimationFrame(animate);
        }

        animate();

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });

        function updateStatsAndCheckAchievements(fw) {
            // Grund-Stats
            stats.totalFired++;
            stats.firedTypes.add(fw.type);



            // Ketten-Berechnung für Achievements
            const chain = getChainData(fw);
            if (chain.size > stats.maxChain) stats.maxChain = chain.size;

            // Check für das legendäre Trio (Komodo, Kraken, Supernova)
            if (chain.types.has('komodo3000') && chain.types.has('kraken') && chain.types.has('supernova')) {
                stats.trioTriggered = true;
            }

            // UI aktualisieren
            updateAchievementUI();
        }

        // Diese Funktion berechnet, wie viele Raketen an einer Zündschnur hängen
        function getChainData(startFw) {
            const visited = new Set();
            const stack = [startFw.id];
            const typesInChain = new Set();

            while (stack.length > 0) {
                const currentId = stack.pop();
                if (visited.has(currentId)) continue;
                visited.add(currentId);

                const fw = placedFireworks.find(f => f.id === currentId);
                if (fw) typesInChain.add(fw.type);

                // Prüfe alle Verbindungen (hin und zurück)
                connections.forEach(conn => {
                    if (conn.from === currentId && !visited.has(conn.to)) stack.push(conn.to);
                    else if (conn.to === currentId && !visited.has(conn.from)) stack.push(conn.from);
                });
            }
            return {
                size: visited.size,
                types: typesInChain
            };
        }

        // Initialisierung erst wenn das Fenster geladen ist
        window.onload = () => {
            updateAchievementUI();
        };