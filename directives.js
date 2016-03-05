/* <grid-screen resource="/api/data.js">
        <grid-columns>
            <grid-column title="Product" field="product"></grid-column>
            <grid-column title="Description" field="description"></grid-column>
            <grid-column title="Cost" field="cost"></grid-column>
        </grid-columns>
        <grid with-inline-editor></grid>
    </grid-screen>*/

app.directive('gridScreen', function ($http) {
	return {
		retrict: 'E',
		controller: function ($scope) {
			this.setEditor = function (editor) {

			};
			this.setColumns = function (cols) {
				$scope.cols = cols;
			};
		},
		link: function (scope, elem, attr) {
			$http.get(attr.resource).then(function (response) {
				scope.rows = response.data.data;

				console.log('gridScreen about to broadcast event!');
				scope.$broadcast('ready-to-render', scope.rows, scope.cols);
			});
		}
	};
});
app.directive('gridColumns', function () {
	return {
		retrict: 'E',
		require: ['^gridScreen', 'gridColumns'],
		controller: function ($scope) {
			var columns = [];
			this.addColumn = function (col) {
				columns.push(col);
			};
			this.getColumns = function () {
				return columns;
			};
		},
		link: function (scope, elem, attr, controllers) {
			var gridController = controllers[0];
			var gridColumnsController = controllers[1];
			gridController.setColumns(gridColumnsController.getColumns());
		}
	};
})
app.directive('gridColumn', function () {
	return {
		retrict: 'E',
		require: '^gridColumns',
		link: function (scope, elem, attr, gridColumnsController) {
			gridColumnsController.addColumn({
				title: attr.title,
				field: attr.field
			});
		}
	};
})
app.directive('grid', function () {
	return {
		retrict: 'E',
		templateUrl: '/template/grid.html',
		replace: true,
		controller: function ($scope) {
			$scope.$on('ready-to-render', function (event, rows, cols) {
				$scope.rows = rows;
				$scope.columns = cols;
				console.log($scope.rows, $scope.columns)
				console.log("Event happened");
			});
		}
	};
});
app.directive('withInlineEditor', function () {
	return {
		retrict: 'A',
		link: function () {
			console.log("withInlineEditor");
		}
	};
});