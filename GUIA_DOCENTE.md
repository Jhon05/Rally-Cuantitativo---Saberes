# Guía docente — Rally Cuantitativo v1.9

1. El estudiante entra en pantalla completa y escribe su nombre.
2. Elige una de las tres carreras de competencia.
3. La carrera siempre tiene tres preguntas.
4. Cada pregunta aparece únicamente cuando el estudiante termina una etapa y llega físicamente al peaje cuantitativo.
5. Las preguntas 1, 2 y 3 corresponden a niveles progresivos: lectura inicial, análisis intermedio y decisión avanzada.
6. La cuarta pregunta aparece en el peaje final.
7. Después de leer la retroalimentación y pulsar Continuar, el estudiante conduce un tramo adicional hasta el FINISH.
8. Las pistas y retroalimentaciones usan MathJax SVG local.
9. La nota se calcula sobre 5,0 a partir de las tres respuestas; usar pista limita esa pregunta a 0,80 puntos relativos.
10. Pausa y Finalizar permanecen disponibles durante la carrera.


## Reglas temporales v2.1
1. El estudiante conduce durante 60 segundos efectivos en cada etapa.
2. Al terminar el minuto aparece el peaje a distancia.
3. Solo la cabina verde habilita la pregunta.
4. Cruzar una cabina roja resta 250 puntos de piloto y obliga a repetir el minuto de conducción de esa etapa.
5. Cada pregunta dispone de 90 segundos.
6. El reloj cambia a amarillo en los últimos 30 segundos y a rojo en los últimos 10.
7. Al llegar a cero, la pregunta queda en 0 puntos, se muestra la solución y el estudiante continúa al siguiente tramo mediante el botón correspondiente.
8. El informe HTML incluye tiempos individuales, promedio, preguntas agotadas y número de peajes fallidos.


### Banco académico actual
Esta versión integra el banco `Banco_Rally_Saber_Pro_TyT_LaTeX_Visible_MathJax_Tablas_HTML`, con tres carreras por competencia y 4 preguntas seleccionadas por niveles progresivos.


### Identificación del estudiante
Antes de iniciar, el estudiante debe registrar su nombre completo y un correo electrónico válido. Ambos datos aparecen en el encabezado del informe HTML.


### Regla de acceso a la pista
La cabina verde funciona como condición de acceso a la ayuda. Si el estudiante entra por otra cabina, responde la pregunta normalmente y continúa a la siguiente etapa, pero el botón de pista permanece bloqueado. No se repite el minuto de conducción.


### Presentación adaptativa de preguntas (v2.5)
El juego analiza la longitud del enunciado, las opciones y la presencia de tablas o gráficas. Con base en ello, el panel cambia entre una o dos columnas de opciones, reduce moderadamente la escala matemática y habilita desplazamiento interno. Ninguna pregunta requiere cambiar el zoom del navegador.


### Distribución v2.7
El estudiante ve primero, en la parte superior, la instrucción y la pregunta completa. Debajo se presentan la información relevante, la tabla HTML o la gráfica necesaria, y las opciones de respuesta. Las tablas nunca se muestran como capturas del cuadernillo.


### Presentación de las preguntas v2.8
El panel izquierdo reúne una sola vez la información y los datos. Las tablas, gráficas y diagramas son componentes HTML/SVG; el texto matemático se renderiza con MathJax.


### Distribución v2.9
La pregunta se divide en una tarea superior breve y un panel inferior con los datos, tablas o gráficas. El texto contextual no se duplica.


## Actualización v3.1
- Se verificó la consistencia visual de las 63 variantes paramétricas.
- Se conservaron las tablas y gráficas en HTML/SVG/MathJax, sin imágenes rasterizadas.
- Se añadieron ayudas visuales reconstruidas para las preguntas que en el cuadernillo original incluían infografías de apoyo, en especial TYT 08 y TYT 09 sobre recolección de residuos.
- Se ajustó la composición del panel de datos para evitar repeticiones y mejorar la lectura integral.


## Vehículos de la versión v3.2

- **Vector GT:** mayor velocidad y comportamiento equilibrado.
- **Pulse RS:** mayor control lateral y aceleración.
- **Titan X:** mayor masa y resistencia, con menor agilidad.

El modelo seleccionado se registra en el estado SCORM y aparece en el informe del estudiante. Las imágenes solo definen la apariencia; la física se calcula en tiempo real mediante Canvas y JavaScript.


## Actualización v3.3 — Color de carrocería
El selector de color modifica ahora la pintura real del vehículo. Cada modelo usa una base neutra y una máscara alfa que limita la coloración a la carrocería. Las ventanas, ruedas, luces, accesorios y sombras permanecen intactos. La miniatura, la vista previa, el vehículo en carrera, la estela y el informe se sincronizan con el color seleccionado.


## Actualización v3.8.1
El menú inicial utiliza ventanas de selección. Las opciones se guardan al elegirlas y el resumen se actualiza de inmediato. Los colores de carrocería se cargan desde sprites precalculados para evitar bloqueos del navegador.


## Banco clasificado por tipo de carrera (v3.10.0)
- Interpretación: 21 preguntas.
- Argumentación: 21 preguntas.
- Formulación y ejecución: 21 preguntas.
- Cada partida usa tres preguntas de la carrera elegida: una por nivel y de familias diferentes cuando es posible.
- Las opciones se vuelven a aleatorizar al iniciar la partida.
