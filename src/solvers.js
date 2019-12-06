/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other


window.findNbrOfsolutions = function(board,validator,rowIndex) {
   var result = 0
   function innerFunction(board,validator,rowIndex){
    if(rowIndex === board.rows().length){
      result++; 
      return 1;
    }
    for(let i = 0; i < board.rows().length; i++){
      board.togglePiece(rowIndex, i);
       if(!board[validator]()){
       innerFunction(board,validator, rowIndex + 1)
      }
      board.togglePiece(rowIndex, i);
    }
    return result
   }
    return innerFunction(board,validator,rowIndex);
  }

  
  window.findCorrectSolution = function(board,validator,rowIndex) {
   var result = 0;
   solution = board.rows();
   function innerFunction(board,validator,rowIndex){
    if(rowIndex === board.rows().length){
      result = 1;
      return solution = board.rows() 
    }
    for(let i = 0; i < board.rows().length; i++){
      board.togglePiece(rowIndex, i);
       if(!board[validator]()){
       innerFunction(board,validator, rowIndex + 1)
       if(result){
        return solution;
       }
      }
      board.togglePiece(rowIndex, i);
    }
    return solution
   }
    return innerFunction(board,validator,rowIndex);
  }
window.findNRooksSolution = function(n) {
  var solution = new Board({'n' : n}); //fixme
  const sol = findCorrectSolution(solution,"hasAnyRooksConflicts",0);
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(sol));
  return sol;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solution = new Board({n : n})
  var solutionCount = findNbrOfsolutions(solution,"hasAnyRooksConflicts",0);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = new Board({n : n}); //fixme
  const sol = findCorrectSolution(solution,"hasAnyQueensConflicts",0);

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(sol));
  return sol;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solution = new Board({n : n})
  var solutionCount = findNbrOfsolutions(solution,"hasAnyQueensConflicts",0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
