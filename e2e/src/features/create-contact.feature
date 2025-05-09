Feature: As a user I expect to be able to create contacts

@smoke
@regression
Scenario: As a user I expect to be able to create a new contact
    Given I am on the "home" page
    And I click the "create" button
    Then I am directed to the "create contact" page
    And the "create contact header" should contain the text "Create Contact"
    And I fill in the "name" input with "Terry Barks"
    And I select the "Male" option from the "gender"
    And I fill in the "phone" input with "843455555"
    And I fill in the "street" input with "123 Fake Street"
    And I fill in the "city" input with "Melbourne"
    And I click the "save" button
    And I am directed to the "home" page

    And I fill in the "search" input with "Terry Barks"
    And the "search" should not equal the text "Terry Bark"
    And the "contact" should be displayed
    And the "full name label" should contain the text "Name:"
    And the "name" should equal the text "Terry Barks"
    And the "gender label" should contain the text "Gender:"
    And the "gender" should equal the text "Male"
    And the "address label" should contain the text "Address:"
    And the "address" should equal the text "123 Fake Street, Melbourne"
    And the "edit" should be displayed
    And the "delete" should be displayed
