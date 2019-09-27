var constraints = angular.module('hermes.constraints', [
    'ui.bootstrap',
    'hermes.constraints.repository'
]);

constraints.controller('ConstraintsController', ['ConstraintsRepository', '$scope', '$stateParams', '$location', '$uibModal',
    function (constraintsRepository, $scope, $stateParams, $location, $modal) {

        var isSubscription = function (constraintsName) {
            return constraintsName.includes('$');
        };

        $scope.edit = function (constraintsItem) {
            $modal.open({
                templateUrl: 'partials/modal/editConstraints.html',
                controller: 'ConstraintsEditController',
                size: 'lg',
                resolve: {
                    constraintsType: function () {
                        return isSubscription(constraintsItem) ? 'subscription' : 'topic';
                    },
                    constraintsName: function () {
                        return constraintsItem;
                    }
                }
            }).result.then(function () {
                loadConstraints();
            });
        };

        var addConstraints = function (constraintsType) {
            $modal.open({
                templateUrl: 'partials/modal/addConstraints.html',
                controller: 'ConstraintsAddController',
                size: 'lg',
                resolve: {
                    constraintsType: function () {
                        return constraintsType;
                    }
                }
            }).result.then(function () {
                loadConstraints();
            });
        };

        $scope.addTopicConstraints = function () {
            addConstraints('topic');
        };

        $scope.addSubscriptionConstraints = function () {
            addConstraints('subscription');
        };

        // $scope.remove = function () {
        //     if (isSubscription($scope.constraintsName)) {
        //         var splittedName = $scope.constraintsName.split("$");
        //         var topicName = splittedName[0];
        //         var subscriptionName = splittedName[1];
        //         constraintsRepository.removeSubscriptionConstraints(topicName, subscriptionName)
        //             .$promise
        //             .then(redirectToConstraintsList);
        //     } else {
        //         constraintsRepository.removeTopicConstraints($scope.constraintsName)
        //             .$promise
        //             .then(redirectToConstraintsList);
        //     }
        // };

        var loadConstraints = function () {
            constraintsRepository.getWorkloadConstraints()
                .then(function (workloadConstraints) {
                    $scope.topicConstraints = workloadConstraints.topicConstraints;
                    $scope.subscriptionConstraints = workloadConstraints.subscriptionConstraints;
                });
        };

        loadConstraints();
    }]);

constraints.controller('ConstraintsAddController', ['ConstraintsRepository', '$scope', '$uibModalInstance', 'constraintsType',
    function (constraintsRepository, $scope, $modal, constraintsType) {
        $scope.constraintsType = constraintsType;
        $scope.consumersNumber = 1;

        $scope.save = function () {
            if ($scope.constraintsType === 'topic') {
                constraintsRepository.updateTopicConstraints({
                    topicName: $scope.constraintsName,
                    constraints: {
                        consumersNumber: $scope.consumersNumber
                    }
                }).then(function () {
                    $modal.close();
                });
            } else {
                constraintsRepository.updateSubscriptionConstraints({
                    subscriptionName: $scope.constraintsName,
                    constraints: {
                        consumersNumber: $scope.consumersNumber
                    }
                }).then(function () {
                    $modal.close();
                });
            }
        }
    }]);

constraints.controller('ConstraintsEditController', ['ConstraintsRepository', '$scope', '$uibModalInstance', 'constraintsType', 'constraintsName',
    function (constraintsRepository, $scope, $modal, constraintsType, constraintsName) {
        $scope.constraintsType = constraintsType;
        $scope.constraintsName = constraintsName;
        $scope.consumersNumber = 1;

        $scope.save = function () {
            if ($scope.constraintsType === 'topic') {
                constraintsRepository.updateTopicConstraints({
                    topicName: $scope.constraintsName,
                    constraints: {
                        consumersNumber: $scope.consumersNumber
                    }
                }).then(function () {
                    $modal.close();
                });
            } else {
                constraintsRepository.updateSubscriptionConstraints({
                    subscriptionName: $scope.constraintsName,
                    constraints: {
                        consumersNumber: $scope.consumersNumber
                    }
                }).then(function () {
                    $modal.close();
                });
            }
        }
    }]);

// constraints.controller('ConstraintsListController', ['ConstraintsRepository', '$scope', '$uibModal',
//     function (constraintsRepository, $scope, $modal) {
//         var loadConstraints = function () {
//             constraintsRepository.getWorkloadConstraints()
//                 .then(function (workloadConstraints) {
//                     $scope.topicConstraints = workloadConstraints.topicConstraints;
//                     $scope.subscriptionConstraints = workloadConstraints.subscriptionConstraints;
//                 });
//         };
//
//         var addConstraints = function (constraintsType) {
//             $modal.open({
//                 templateUrl: 'partials/modal/addConstraints.html',
//                 controller: 'ConstraintsAddController',
//                 size: 'lg',
//                 resolve: {
//                     constraintsType: function () {
//                         return constraintsType;
//                     }
//                 }
//             }).result.then(function () {
//                 loadConstraints();
//             });
//         };
//
//         $scope.addTopicConstraints = function () {
//             addConstraints('topic');
//         };
//
//         $scope.addSubscriptionConstraints = function () {
//             addConstraints('subscription');
//         };
//
//         loadConstraints();
//     }]);
