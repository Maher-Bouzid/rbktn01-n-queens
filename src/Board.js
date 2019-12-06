// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      const row = this.get(rowIndex); // get the row
      let nbrOfPieces = 0;
      //loop over the row
      for (let i = 0; i < row.length; i++){
        //sum all the values of the row
        nbrOfPieces += row[i];
        //if the sum of the values is more than one return true
        if(nbrOfPieces > 1){
          return true;
        }
      }
      return false; // fixme
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      const matrix = this.rows(); //get the matrix
      //loop over the matrix
      for (let i = 0; i < matrix.length; i++){
        //check if the current row has any conflict 
        if(this.hasRowConflictAt(i)){
          return true;
        }
      }
      return false; // fixme
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      const matrix = this.rows(); // get the matrix
      let nbrOfPieces = 0;
      //loop over the collum
      for (let i = 0; i < matrix.length; i++){
        //sum all the values of the collum
        nbrOfPieces += matrix[i][colIndex];
        //if the sum of the values is more than one return true
        if(nbrOfPieces > 1){
          return true;
        }
      }
      return false; // fixme
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      const matrix = this.rows(); // get the matrix
      //loop over the matrix
      for (let i = 0; i < matrix.length; i++){
        //check if the current collum has any conflict 
        if(this.hasColConflictAt(i)){
          return true;
        }
      }
      return false; // fixme
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      const matrix = this.rows(); //get the matrix
      let nbrOfPieces = 0;
      let rowIndex = 0;
      let colIndex = majorDiagonalColumnIndexAtFirstRow; 

      //check if the collum index is less than 0
      if(majorDiagonalColumnIndexAtFirstRow < 0){
        //the row index become the absolute value of the row index
        rowIndex = Math.abs(majorDiagonalColumnIndexAtFirstRow);
        colIndex = 0; // the row index become 0
      }
      //loop over the matrix
      while (rowIndex < matrix.length && colIndex < matrix.length) {
        //sum all the values of the major diagnal
        nbrOfPieces += matrix[rowIndex][colIndex];
        //check if the current major diagnal
        if(nbrOfPieces > 1){
          return true;
        }
        rowIndex++;
        colIndex++;
      }
      return false; // fixme
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      const matrix = this.rows();
      for (var i = -(matrix.length - 1); i < matrix.length; i++) {
        //check if the current major diagnal has any conflict 
        if(this.hasMajorDiagonalConflictAt(i)){
          return true;
        }
      }
      return false; // fixme
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      const matrix = this.rows();
      let nbrOfPieces = 0;
      let rowIndex = 0;
      let colIndex = minorDiagonalColumnIndexAtFirstRow;
      
      //check if the collum index is more than 3
      if(minorDiagonalColumnIndexAtFirstRow > (matrix.length - 1)){
        rowIndex = minorDiagonalColumnIndexAtFirstRow - (matrix.length - 1);
        colIndex = matrix.length - 1;
      }

      while (colIndex >= 0 && rowIndex < matrix.length) {
        nbrOfPieces += matrix[rowIndex][colIndex];
        if(nbrOfPieces > 1){
          return true;
        }
        rowIndex++;
        colIndex--;
      }
      return false; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      const matrix = this.rows();
      for (var i = 0; i < (matrix.length * 2) - 1; i++) {
        //check if the current minor diagnal has any conflict 
        if(this.hasMinorDiagonalConflictAt(i)){
          return true;
        }
      }
      return false; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
