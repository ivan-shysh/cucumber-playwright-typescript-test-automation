Feature: As a user I expect to be able to navigate to the home page

# @dev to signify that the test is still in development
  @smoke  #most important key scenarios that we want to run as part of automation
  @regression  #will likely be on every scenario, to run a full regression suite, either locally or in CI 
  Scenario: As a user I expect to be able to see contacts
    Given I am on the "home" page
    And the "header logo" should be displayed
    Then the "contacts header" should contain the text "Contacts"

  Scenario: As a user I don't expect to see a contact that does not exist
    Given I am on the "home" page
    And I fill in the "search" input with "Funky Name"
    Then the "contact" should not be displayed
