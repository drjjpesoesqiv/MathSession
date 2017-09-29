var MathQuiz = function() {};

MathQuiz.prototype = {
  operators: {
    'mul': '*',
    'div': '/',
    'add': '+',
    'sub': '-'
  },

  hydrate: function(session) {
    this.terms = session.terms;
    this.operator = session.operator;
  },

  dehydrate: function() {
    return {
      "terms": this.terms,
      "operator": this.operator
    }
  },

  terms: [],
  operator: null,

  solve: function(answer) {
   var eq = this.terms.join(this.operators[this.operator]);
   return eval(eq) == answer;
  },

  // requests
  problem: function(operator, digits, numTerms) {
    this.operator = operator;
    this.terms = [];
    for (var i = 0; i < numTerms; i++)
    {
      var low  = Math.pow(10, digits - 1);
      var high = Math.pow(10, digits) - 1;
      this.terms.push(Math.floor(Math.random() * (high - low) + low));
    }
  }
}

module.exports = new MathQuiz();
