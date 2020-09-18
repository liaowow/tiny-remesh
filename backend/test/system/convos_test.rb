require "application_system_test_case"

class ConvosTest < ApplicationSystemTestCase
  setup do
    @convo = convos(:one)
  end

  test "visiting the index" do
    visit convos_url
    assert_selector "h1", text: "Convos"
  end

  test "creating a Convo" do
    visit convos_url
    click_on "New Convo"

    fill_in "Title", with: @convo.title
    click_on "Create Convo"

    assert_text "Convo was successfully created"
    click_on "Back"
  end

  test "updating a Convo" do
    visit convos_url
    click_on "Edit", match: :first

    fill_in "Title", with: @convo.title
    click_on "Update Convo"

    assert_text "Convo was successfully updated"
    click_on "Back"
  end

  test "destroying a Convo" do
    visit convos_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Convo was successfully destroyed"
  end
end
