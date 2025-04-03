Feature: As a user I can interact with checkboxes

@dev
@smoke
@regression
Scenario: As a user I can interact and assert on checkboxes
    Given I am on the "home" page
    And I click the "playground" button
    When I am directed to the "playground" page
    And the "blue" check box should not be checked