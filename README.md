  Convertidor de Números Romanos

## Descripción general
El **Convertidor de Números Romanos** es una aplicación desarrollada en **Node.js** que permite transformar números arábigos (los que usamos normalmente) a su representación en números romanos, y viceversa.

El proyecto está diseñado como una **API REST**, alojada en **Vercel**, y cuenta con **tests automatizados** implementados con **Jest** para garantizar su correcto funcionamiento.  

Además, utiliza **GitHub Actions** como sistema de **Integración Continua (CI)** para ejecutar las pruebas cada vez que se actualiza el repositorio.  

---

## Funcionalidades principales

###  Conversión de número normal a romano
- **Ruta:** `/a2r?arabic=num`  
- **Ejemplo:** `/a2r?arabic=2025`  
- **Respuesta:** `{ "result": "MMXXV" }`

###  Conversión de número romano a normal
- **Ruta:** `/r2a?roman=num`  
- **Ejemplo:** `/r2a?roman=MMXXV`  
- **Respuesta:** `{ "result": 2025 }`

###  Ruta raíz de prueba
- **Ruta:** `/`  
- **Respuesta:** `"✅ API Convertidor Romano funcionando correctamente"`

---

##  Estructura del proyecto

```
convertidor-numeros-romanos/
│
├── index.js             # Lógica principal (toRoman / fromRoman)
├── server.js            # API Express exportada para Vercel
├── converter.test.js    # Pruebas automatizadas con Jest
├── package.json         # Configuración del proyecto
├── vercel.json          # Configuración de despliegue en Vercel
└── .github/
    └── workflows/
        └── ci.yml       # CI con GitHub Actions
```

---

##  Lógica de conversión

###  `toRoman(num)`
Convierte un número entero (1 a 3999) en su representación romana, utilizando un mapeo descendente de valores (`M`, `CM`, `D`, `CD`, etc.).

###  `fromRoman(roman)`
Lee un número romano carácter por carácter desde el final, aplicando la regla de resta cuando una letra menor precede a una mayor (`IV` = 4, `IX` = 9, etc.).

---

## Testing con Jest

El proyecto utiliza **Jest** para validar el comportamiento esperado del conversor.  
Incluye:
- Tests básicos de conversión individual.
- Tests cruzados en forma de **array de casos** (`test.each()`).
- Tests de errores y casos límite.

Los tests se ejecutan automáticamente en cada `push` o `pull request` mediante **GitHub Actions**.  

---

##  Descripción de los tests

El archivo `converter.test.js` contiene distintos tipos de pruebas agrupadas por funcionalidad:

---

###  1. **Tests individuales simples**
```js
test('Convierte número a romano correctamente', () => {...});
test('Convierte romano a número correctamente', () => {...});
```
 **Qué hace:**  
Comprueba casos básicos y directos de conversión en ambas direcciones.  
 **Objetivo:** verificar que las funciones principales devuelvan los resultados esperados.

---

###  2. **Array de tests (con `test.each()`)**
```js
describe('Conversión cruzada usando arrays de tests', () => {
  const casos = [
    [1, 'I'],
    [3, 'III'],
    [44, 'XLIV'],
    [99, 'XCIX'],
    [2025, 'MMXXV'],
  ];
  test.each(casos)(
    'Convierte %i a %s y viceversa correctamente',
    (numero, romano) => {
      expect(toRoman(numero)).toBe(romano);
      expect(fromRoman(romano)).toBe(numero);
    }
  );
});
```

 **Qué hace:**  
Ejecuta automáticamente la misma prueba con múltiples pares de datos.  
 **Objetivo:** validar **consistencia bidireccional** entre ambas funciones.  
 Jest muestra cada caso como una línea separada, lo que hace el test más visual.

---

###  3. **Casos límite y errores**
```js
describe('Casos límite y errores', () => {
  test('Número fuera de rango', () => {
    expect(toRoman(0)).toMatch(/fuera de rango/i);
    expect(toRoman(4000)).toMatch(/fuera de rango/i);
  });

  test('Romano inválido', () => {
    expect(fromRoman('ABC')).toMatch(/inválido/i);
  });
});
```

 **Qué hace:**  
Prueba el comportamiento del programa ante datos **inválidos** o **fuera de rango**.  
 **Objetivo:** garantizar que la aplicación no se rompa ante entradas incorrectas.

---

###  4. **Resumen de tipos de tests**
| Tipo de test | Qué valida | Ejemplo |
|---------------|-------------|----------|
| Unitario simple | Una conversión puntual | `toRoman(58) → LVIII` |
| Bidireccional (test.each) | Coherencia entre ambos métodos | `99 ↔ XCIX` |
| Límite / Error | Entradas inválidas o fuera de rango | `toRoman(0)` → “fuera de rango” |

---

##  Despliegue en Vercel

El proyecto se despliega en **Vercel** como una API Serverless.

**Ejemplo de endpoints activos:**
```
https://numeros-romanos-facucastillo01.vercel.app/a2r?arabic=123

→ { "result": "CXXIII" }

https://numeros-romanos-facucastillo01.vercel.app/r2a?roman=CXXIII
→ { "result": 123 }
```

---

##  Tecnologías utilizadas
| Tecnología | Uso |
|-------------|-----|
| Node.js | Entorno de ejecución |
| Express | Framework para la API |
| Jest | Testing automatizado |
| GitHub Actions | Integración Continua |
| Vercel | Despliegue en la nube |

---

## 👨‍💻 Autor
Proyecto desarrollado por **Facundo Nahuel Castillo Jerez**  
📍 Universidad Provincial de Córdoba Sede Regional Capilla del Monte «Dr. Bernardo Houssay» — 2025
