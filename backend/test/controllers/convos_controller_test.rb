require 'test_helper'

class ConvosControllerTest < ActionDispatch::IntegrationTest
  setup do
    @convo = convos(:one)
  end

  test "should get index" do
    get convos_url
    assert_response :success
  end

  test "should get new" do
    get new_convo_url
    assert_response :success
  end

  test "should create convo" do
    assert_difference('Convo.count') do
      post convos_url, params: { convo: { title: @convo.title } }
    end

    assert_redirected_to convo_url(Convo.last)
  end

  test "should show convo" do
    get convo_url(@convo)
    assert_response :success
  end

  test "should get edit" do
    get edit_convo_url(@convo)
    assert_response :success
  end

  test "should update convo" do
    patch convo_url(@convo), params: { convo: { title: @convo.title } }
    assert_redirected_to convo_url(@convo)
  end

  test "should destroy convo" do
    assert_difference('Convo.count', -1) do
      delete convo_url(@convo)
    end

    assert_redirected_to convos_url
  end
end
