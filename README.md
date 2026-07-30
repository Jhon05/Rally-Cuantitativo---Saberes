# Rally Cuantitativo v3.8.9

Proyecto listo para GitHub y SCORM 1.2.

## Carreras disponibles
- Interpretación
- Argumentación
- Formulación y ejecución

Cada carrera selecciona exactamente tres preguntas del nuevo banco Saber Pro–Saber TyT. Las preguntas se presentan en orden progresivo de nivel 1 a nivel 3. La tercera se libera en el peaje final; después queda un tramo adicional de conducción antes del FINISH.

## Banco académico
- 63 variantes paramétricas totales.
- Imágenes del proyecto LaTeX suministrado por el usuario.
- Pistas y retroalimentaciones en LaTeX renderizado con MathJax 3 SVG local.
- La clasificación de nivel 1–4 es una organización de diseño del juego y no una dificultad oficial del Icfes.

## Ejecución
Abra `index.html`. Para Brightspace, cargue el ZIP completo como paquete SCORM 1.2.


## Actualización v2.0
- El juego usa el banco textual con MathJax de alta calidad.
- Los enunciados y opciones ya no se muestran como capturas.
- Solo se conservan gráficas y tablas necesarias para resolver algunas preguntas.


## Actualización v2.1 — tiempos y peajes obligatorios
- Cada etapa exige 60 segundos efectivos de conducción antes de liberar el peaje.
- La pregunta solo se activa al cruzar la cabina verde.
- Una cabina incorrecta resta 250 puntos de piloto y reinicia el minuto de esa etapa.
- Cada pregunta tiene un reloj regresivo de 1 minuto y 30 segundos.
- Al agotarse el tiempo, la pregunta vale 0 puntos y se continúa con la siguiente etapa tras leer la retroalimentación.
- El informe registra el tiempo por pregunta, promedio, tiempos agotados y peajes fallidos.


## Actualización v2.2
- El juego usa el banco en LaTeX visible con MathJax SVG.
- Las preguntas y opciones se muestran con renderizado matemático de alta calidad.
- Las tablas se muestran en HTML de alto contraste y ya no como imágenes.


## Actualización v2.3 — correo del estudiante
- El menú exige nombre completo y correo electrónico válido.
- El correo queda asociado al intento en el estado SCORM.
- El informe HTML muestra el correo inmediatamente debajo del nombre del estudiante.


## Actualización v3.8.1 — pista condicionada por el peaje
- La pregunta se habilita tanto si el estudiante entra por la cabina verde como si entra por otra cabina.
- Entrar por una cabina incorrecta mantiene la penalización de 250 puntos de piloto.
- La etapa no se repite.
- La pista matemática queda bloqueada únicamente para esa pregunta.
- El informe registra si la pista estuvo disponible o bloqueada.


## Actualización v2.5 — preguntas adaptativas
- El panel de preguntas utiliza toda el área útil del dispositivo sin desbordar la pantalla.
- Enunciado, opciones, tablas, pista y retroalimentación tienen desplazamiento interno independiente.
- Las opciones largas pasan automáticamente a una sola columna.
- El tamaño tipográfico se ajusta según la densidad real de cada pregunta.
- El botón Continuar permanece accesible al final del panel.


## Actualización v2.8
- La instrucción y el enunciado completo aparecen en una banda superior, antes de la información y las opciones.
- Las tablas se presentan exclusivamente como HTML de alto contraste con TeX renderizado por MathJax.
- No se muestran imágenes o capturas de tablas del documento original.
- Cuando una pregunta con tabla incluye opciones gráficas, estas se conservan como visual adicional.


## Actualización v2.8
La interfaz de preguntas usa un formato único: prosa HTML, fórmulas TeX con MathJax, tablas HTML y gráficas vectoriales HTML/SVG. No se muestran capturas con texto del cuadernillo.


## Actualización v2.9
- La franja superior muestra únicamente la tarea que debe responder el estudiante.
- Los datos específicos aparecen una sola vez en el panel inferior.
- Todas las tablas, gráficas y diagramas se generan con HTML/CSS/SVG y MathJax; no hay capturas ni imágenes con texto.


## Actualización v3.0
- Se corrigió la regla CSS que ampliaba los SVG internos de MathJax hasta ocupar todo el ancho de las tablas.
- Los números, porcentajes, fracciones, monedas y unidades mantienen ahora una escala uniforme.
- Las gráficas SVG continúan adaptándose al panel sin afectar el tamaño de la notación matemática.


## Actualización v3.1
- Se verificó la consistencia visual de las 63 variantes paramétricas.
- Se conservaron las tablas y gráficas en HTML/SVG/MathJax, sin imágenes rasterizadas.
- Se añadieron ayudas visuales reconstruidas para las preguntas que en el cuadernillo original incluían infografías de apoyo, en especial TYT 08 y TYT 09 sobre recolección de residuos.
- Se ajustó la composición del panel de datos para evitar repeticiones y mejorar la lectura integral.


## Rally Cuantitativo v3.2 — Sprites y física vehicular

- Se integraron 21 sprites PNG individuales con transparencia real.
- El jugador puede elegir Vector GT, Pulse RS o Titan X.
- Los vehículos del tráfico incluyen sedanes, coupé, hatchback, motos, van y camiones.
- Los obstáculos incluyen conos, barreras, llantas, aceite, bache, caja y señal de obra.
- La física permanece programada en Canvas: masa, inercia, frenado, cambio de carril, rebote, suspensión visual, sombras, luces de freno y turbo.
- El color elegido en el menú controla la luz inferior y la estela del vehículo, sin deformar el sprite.
- Los activos se encuentran en `assets/sprites/` y están descritos en `assets/sprites/manifest.json`.


## Actualización v3.3 — Color de carrocería
El selector de color modifica ahora la pintura real del vehículo. Cada modelo usa una base neutra y una máscara alfa que limita la coloración a la carrocería. Las ventanas, ruedas, luces, accesorios y sombras permanecen intactos. La miniatura, la vista previa, el vehículo en carrera, la estela y el informe se sincronizan con el color seleccionado.


## Actualización v3.8.1
El menú inicial utiliza ventanas de selección. Las opciones se guardan al elegirlas y el resumen se actualiza de inmediato. Los colores de carrocería se cargan desde sprites precalculados para evitar bloqueos del navegador.



## Ajuste v3.8.6
- Se eliminó la tarjeta gigante que cubría la carretera.
- Cada peaje se integra directamente dentro del Canvas como escenario de carretera.
- El peaje permanece fijo en la escena; no baja por la pantalla ni se comporta como un objeto móvil.
- Durante la aproximación se despejan tráfico y obstáculos para evitar superposiciones.
- El carril habilitado es progresivo y coincide con cada etapa: 1, 2, 3 y 4.
- Una guía verde sobre la vía indica el carril correcto sin tapar la conducción.


## Corrección v3.8.6 — carretera y tráfico conservados
- El peaje ya no pinta un fondo opaco sobre todo el Canvas.
- La autopista animada original permanece visible durante la aproximación.
- Los carros, motos, camiones y obstáculos continúan activos y se dibujan delante del peaje.
- El tráfico solo evita nuevas maniobras o apariciones en los últimos 125 m para dejar libre el ingreso.
- Las imágenes entregadas se procesaron como capas transparentes con bordes suaves; los originales también se conservan.
- La guía verde se hizo más estrecha y solo aparece en los últimos 520 m.


## Corrección v3.8.6 — peajes siempre visibles
- El peaje se precarga mediante URL absoluta relativa al paquete SCORM.
- Se incorpora una imagen recortada de la estructura, sin reemplazar la carretera completa.
- Existe un peaje vectorial de respaldo si el navegador demora o impide cargar la imagen.
- El tráfico permanece activo; solo se libera la cabina verde en los últimos 145 metros.
- Los indicadores de cabina se dibujan sobre la imagen y coinciden con la lógica del juego.


## Ajuste v3.8.8 — peaje integrado por perspectiva
- El peaje está anclado al eje de la carretera y crece suavemente solo por la aproximación real.
- La estructura llega hasta la zona de cruce, de modo que el automóvil parece pasar bajo la cabina.
- Se mantiene tráfico en los carriles laterales y solo se despeja la cabina verde.
- La fuerza lateral se desactiva en los últimos 330 m para no desviar injustamente al estudiante.
- La guía verde sigue la perspectiva y coincide con el carril habilitado.


## Ajuste v3.8.9 — imágenes por carril verde
- Peaje 1: letrero y guía de piso verdes en el carril 1.
- Peaje 2: letrero y guía de piso verdes en el carril 2.
- Peaje 3: letrero y guía de piso verdes en el carril 3.
- Peaje 4: letrero y guía de piso verdes en el carril 4.
- Las imágenes tienen transparencia progresiva en la parte inferior para conservar la carretera, el jugador y el tráfico del Canvas.


## Actualización v3.10.0 — perspectiva fotográfica calibrada
- La imagen del peaje ocupa todo el ancho de la pista, sin bordes laterales artificiales.
- El tráfico queda detrás de la fotografía durante el fundido y se retira al completar la transición.
- El automóvil del estudiante se alinea con los centros reales de los cuatro carriles fotografiados.
- En los últimos 125 m, el automóvil avanza visualmente hacia la cabina manteniendo el control lateral.
- Se conserva la correspondencia etapa 1→carril 1, etapa 2→carril 2, etapa 3→carril 3 y etapa 4→carril 4.


## Audio original v3.10.0
- Música de menú: ambiente electrónico de preparación.
- Música de conducción: ritmo dinámico de rally con motor reactivo a la velocidad.
- Música de preguntas: tensión moderada para favorecer la concentración.
- Aproximación al peaje: ostinato creciente y señal sonora de llegada.
- Meta: fanfarria electrónica triunfal.
- Efectos independientes para inicio, selección, respuesta correcta, respuesta incorrecta y peaje.
- El botón SONIDO silencia o reactiva todas las capas.


## Audio integrado v3.10.0
- Música contextual automática para menú, conducción, preguntas, aproximación al peaje y meta.
- Fundidos entre escenas sin reiniciar la pista al pausar o continuar.
- Motor reactivo a velocidad, turbo y aproximación al peaje.
- Atenuación automática de la música durante alertas, aciertos, errores y fanfarrias.
- Señales sonoras progresivas a 480 m y 180 m del peaje.
- Sonido de cabina correcta/incorrecta, selección de opción, pista y controles de interfaz.
- Compatible con ejecución local, GitHub Pages y SCORM 1.2.


## Banco clasificado por tipo de carrera (v3.10.0)
- Interpretación: 21 preguntas.
- Argumentación: 21 preguntas.
- Formulación y ejecución: 21 preguntas.
- Cada partida usa tres preguntas de la carrera elegida: una por nivel y de familias diferentes cuando es posible.
- Las opciones se vuelven a aleatorizar al iniciar la partida.
