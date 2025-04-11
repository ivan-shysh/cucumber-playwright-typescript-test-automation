Feature: As a user I can interact with tabs

@dev
@smoke
@regression
Scenario: As a user I can interact and assert on new tabs
    Given I am on the "home" page
    And I click the "playground" button
    When I am directed to the "playground" page