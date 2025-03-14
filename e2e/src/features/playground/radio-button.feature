Feature: As a user I can interact with radio buttons

    @dev
    @smoke
    @regression
    Scenario: As a user I can interact and assert on radio buttons
        Given I am on the "home" page
        And I click the "playground" button
        When I am directed to the "playground" page
        And the "female" radio button should be checked
        Then I check the "male" radio button 
        And the "male" radio button should be checked
