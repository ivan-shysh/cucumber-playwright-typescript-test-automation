Feature: As a user I expect to be able to create contacts

@dev
Scenario: As a user I to be able to create a new contacts
    Given I am on the "home" page
    And I click the "create" button
    Then I am directed to the "create contact" page
    