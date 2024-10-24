Feature: As a user I expect to be able to create contacts

@dev
Scenario: As a user I expect to be able to create a new contact
    Given I am on the "home" page
    And I click the "create" button
    Then I am directed to the "create contact" page
    And the "create contact header" should contain the text "Create Contact"
    And I fill in the "name" input with "Ted Smith"
    And I select the "Male" option from the "gender"
    And I fill in the "phone" input with "843455555"
    And I fill in the "street" input with "123 Fake Street"
    And I fill in the "city" input with "Melbourne"
    And I click the "save" button

    And I am directed to the "home" page