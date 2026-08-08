@ui
Feature: Practice Software Testing user journeys

  @smoke
  Scenario: Customer can view the product catalog
    Given the customer is on the home page
    Then the product catalog should be displayed

  @register
  Scenario: Customer can create a new account
    Given the customer is on the registration page
    When the customer submits valid registration data
    Then the customer should be redirected to the login page

  @search
  Scenario: Customer can search for an exact product and view details
    Given the customer is on the home page
    When the customer searches for "Combination Pliers"
    And the customer opens product "Combination Pliers"
    Then the product details for "Combination Pliers" should be displayed

  @filter
  Scenario: Customer can filter hand tools and sort by price low to high
    Given the customer is on the home page
    When the customer filters products by category "Hand Tools"
    And the customer sorts products by price low to high
    Then product prices should be sorted from low to high

  @cart
  Scenario: Customer can add a product to the basket and change quantity
    Given the customer is on the home page
    When the customer adds "Bolt Cutters" to the cart with quantity 2
    And the customer opens the cart
    Then the cart should contain "Bolt Cutters"
    And the cart quantity for "Bolt Cutters" should be "2"
    And the cart line price for "Bolt Cutters" should be "$96.82"