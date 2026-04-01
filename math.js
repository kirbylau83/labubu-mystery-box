function generateMathProblem(difficulty) {
  switch (difficulty) {
    case "easy":
      return generateEasy();
    case "medium":
      return generateMedium();
    case "hard":
      return generateHard();
  }
}

function generateEasy() {
  const ops = ["+", "−"];
  const op = ops[Math.floor(Math.random() * ops.length)];
  let a, b, answer;

  if (op === "+") {
    a = randInt(1, 50);
    b = randInt(1, 50);
    answer = a + b;
  } else {
    a = randInt(10, 99);
    b = randInt(1, a);
    answer = a - b;
  }

  return { equation: `${a} ${op} ${b}`, answer };
}

function generateMedium() {
  const ops = ["×", "÷"];
  const op = ops[Math.floor(Math.random() * ops.length)];
  let a, b, answer;

  if (op === "×") {
    a = randInt(2, 12);
    b = randInt(2, 12);
    answer = a * b;
  } else {
    b = randInt(2, 12);
    answer = randInt(2, 12);
    a = b * answer;
  }

  return { equation: `${a} ${op} ${b}`, answer };
}

function generateHard() {
  const type = Math.floor(Math.random() * 3);
  let equation, answer;

  if (type === 0) {
    const a = randInt(2, 12);
    const b = randInt(2, 9);
    const c = randInt(1, 20);
    answer = a * b + c;
    equation = `(${a} × ${b}) + ${c}`;
  } else if (type === 1) {
    const a = randInt(2, 12);
    const b = randInt(2, 9);
    const c = randInt(1, Math.min(a * b - 1, 20));
    answer = a * b - c;
    equation = `(${a} × ${b}) − ${c}`;
  } else {
    const a = randInt(10, 50);
    const b = randInt(5, 30);
    const c = randInt(2, 10);
    answer = a + b * c;
    equation = `${a} + (${b} × ${c})`;
  }

  return { equation, answer };
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
